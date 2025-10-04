import { useEffect, useRef } from "react";
import cytoscape, { Core, EdgeSingular, NodeSingular } from "cytoscape";
import fcose from "cytoscape-fcose";
import { GraphData } from "@/hooks/usePublications";

cytoscape.use(fcose);

interface GraphVisualizationProps {
  data: GraphData | null;
  onNodeClick: (publicationId: string) => void;
  selectedNodeId?: string;
}

const GraphVisualization = ({ data, onNodeClick, selectedNodeId }: GraphVisualizationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<Core | null>(null);

  useEffect(() => {
    if (!containerRef.current || !data) return;

    // Initialize Cytoscape
    const cy = cytoscape({
      container: containerRef.current,
      elements: [
        ...data.nodes.map((node) => ({
          data: {
            id: node.id,
            label: node.label,
            publicationId: node.publicationId,
          },
        })),
        ...data.edges.map((edge) => ({
          data: {
            id: `${edge.source}-${edge.target}`,
            source: edge.source,
            target: edge.target,
            label: edge.label,
            sharedConcepts: edge.sharedConcepts,
          },
        })),
      ],
      style: [
        {
          selector: "node",
          style: {
            "background-color": "hsl(195, 100%, 50%)",
            label: "data(label)",
            color: "hsl(210, 40%, 98%)",
            "text-valign": "center",
            "text-halign": "center",
            "font-size": "12px",
            "font-weight": "bold",
            width: 60,
            height: 60,
            "border-width": 2,
            "border-color": "hsl(195, 100%, 50%)",
            "text-wrap": "wrap",
            "text-max-width": "80px",
          },
        },
        {
          selector: "node:selected",
          style: {
            "background-color": "hsl(280, 70%, 60%)",
            "border-color": "hsl(280, 70%, 60%)",
            "border-width": 4,
          },
        },
        {
          selector: "edge",
          style: {
            width: 2,
            "line-color": "hsl(195, 100%, 50%, 0.4)",
            "target-arrow-color": "hsl(195, 100%, 50%, 0.4)",
            "target-arrow-shape": "triangle",
            "curve-style": "bezier",
            label: "data(label)",
            "font-size": "10px",
            color: "hsl(215, 20%, 65%)",
            "text-background-color": "hsl(220, 30%, 6%)",
            "text-background-opacity": 0.8,
            "text-background-padding": "3px",
          },
        },
      ],
      layout: {
        name: "fcose",
        quality: "default",
        randomize: false,
        animate: true,
        animationDuration: 1000,
        fit: true,
        padding: 50,
        nodeSeparation: 100,
        idealEdgeLength: 100,
      } as any,
    });

    // Node click handler
    cy.on("tap", "node", (event) => {
      const node = event.target as NodeSingular;
      const publicationId = node.data("publicationId");
      if (publicationId) {
        onNodeClick(publicationId);
      }
    });

    cyRef.current = cy;

    return () => {
      cy.destroy();
    };
  }, [data, onNodeClick]);

  useEffect(() => {
    if (!cyRef.current || !selectedNodeId) return;

    // Highlight selected node
    cyRef.current.nodes().removeClass("selected");
    const selectedNode = cyRef.current.nodes().filter((node: NodeSingular) => node.data("publicationId") === selectedNodeId);
    selectedNode.addClass("selected");
  }, [selectedNodeId]);

  if (!data) {
    return (
      <div className="w-full h-[600px] bg-card/40 border border-border rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Select a publication to view its relationships</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">Publication Relationship Graph</h3>
        <p className="text-sm text-muted-foreground">
          Click on nodes to explore related publications. Edge labels show the number of shared key concepts.
        </p>
      </div>
      <div
        ref={containerRef}
        className="w-full h-[600px] bg-gradient-card backdrop-blur-sm border border-border rounded-lg"
      />
    </div>
  );
};

export default GraphVisualization;
