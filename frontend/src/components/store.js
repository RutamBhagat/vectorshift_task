import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

const DEFAULT_MARKER = {
  type: MarkerType.ArrowClosed,
  width: 12,
  height: 12,
  color: '#b1b1b7',
};

export const useStore = create(
  persist(
    (set, get) => ({
      // State
      nodes: [],
      edges: [],
      nodeIDs: {},
      pipelineStats: null,
      isStatsDialogOpen: false,
      validationMessages: [],
      showConfetti: false,
      isCustomEdge: true,  // Add this state

      // Getters
      getNodes: () => get().nodes,
      getEdges: () => get().edges,
      getNodeID: (type) => {
        const newIDs = { ...get().nodeIDs };
        if (newIDs[type] === undefined) {
          newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({ nodeIDs: newIDs });
        return `${type}-${newIDs[type]}`;
      },

      // Node operations
      addNode: (node) => {
        set({
          nodes: [...get().nodes, node],
        });
      },
      onNodesChange: (changes) => {
        set({
          nodes: applyNodeChanges(changes, get().nodes),
        });
      },
      updateNodeField: (nodeId, fieldName, fieldValue) => {
        set({
          nodes: get().nodes.map((node) => {
            if (node.id === nodeId) {
              node.data = { ...node.data, [fieldName]: fieldValue };
            }
            return node;
          }),
        });
      },
      removeNode: (nodeId) => {
        set({
          nodes: get().nodes.filter((node) => node.id !== nodeId),
          edges: get().edges.filter(
            (edge) => edge.source !== nodeId && edge.target !== nodeId
          ),
        });
      },

      // Edge operations
      onEdgesChange: (changes) => {
        set({
          edges: applyEdgeChanges(changes, get().edges),
        });
      },
      setEdges: (updater) => {
        set({ edges: typeof updater === 'function' ? updater(get().edges) : updater });
      },
      onConnect: (connection) => {
        set({
          edges: addEdge(
            {
              ...connection,
              type: get().isCustomEdge ? "custom" : "base",
              animated: true,
              markerEnd: DEFAULT_MARKER,
            },
            get().edges
          ),
        });
      },
      removeEdge: (edgeId) => {
        set({
          edges: get().edges.filter((edge) => edge.id !== edgeId),
        });
      },
      setPipelineStats: (stats) => set({ 
        pipelineStats: stats,
        showConfetti: stats?.is_dag && stats?.is_pipeline,
      }),
      setStatsDialogOpen: (isOpen) => set(state => ({ 
        isStatsDialogOpen: isOpen,
        pipelineStats: isOpen ? state.pipelineStats : null,
        showConfetti: isOpen ? state.showConfetti : false,
      })),
      toggleEdgeType: () => set(state => ({ 
        isCustomEdge: !state.isCustomEdge 
      })),
    }),
    {
      name: 'pipeline-storage', // unique name for localStorage key
      partialize: (state) => ({
        // only persist these states
        nodes: state.nodes,
        edges: state.edges,
        nodeIDs: state.nodeIDs,
        isCustomEdge: state.isCustomEdge,
      }),
    }
  )
);
