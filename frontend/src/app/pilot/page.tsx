"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchGlobalState, defaultStages, updateStageProgress, completeStage } from "@/lib/api";

interface Stage {
  id: number;
  name: string;
  description: string;
  unlocked: boolean;
  completed: boolean;
  checklist: { id: string; text: string; completed: boolean }[];
}

export default function PilotDashboard() {
  const router = useRouter();
  const [stages, setStages] = useState<Stage[]>([]);
  const [currentStage, setCurrentStage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGlobalState()
      .then((data) => {
        setStages(data.stages || defaultStages);
        const unlocked = data.stages?.find((s: Stage) => s.unlocked && !s.completed);
        if (unlocked) setCurrentStage(unlocked.id);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
        setStages(defaultStages);
      })
      .finally(() => setLoading(false));
  }, []);

    const toggleChecklist = async (stageId: number, itemId: string) => {
    const newStages = stages.map((stage) => {
      if (stage.id === stageId) {
        return {
          ...stage,
          checklist: stage.checklist.map((item) =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
          ),
        };
      }
      return stage;
    });
    setStages(newStages);

    const currentChecklist = newStages.find((s) => s.id === stageId)?.checklist.find((i) => i.id === itemId);
    if (currentChecklist) {
      await updateStageProgress(stageId, itemId, !currentChecklist.completed);
    }
  };

  const handleCompleteStage = async (stageId: number) => {
    await completeStage(stageId);
    if (stageId < 4) setCurrentStage(stageId + 1);
  };

  const isStageAccessible = (stageId: number) => {
    if (stageId === 1) return true;
    const prevStage = stages.find((s) => s.id === stageId - 1);
    return prevStage?.completed || prevStage?.unlocked;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-apple-bg">
        <div className="animate-spin w-8 h-8 border-4 border-apple-blue border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const colors = ["stage1", "stage2", "stage3", "stage4"] as const;

  return (
    <div className="min-h-screen bg-apple-bg">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => router.push("/")} className="text-apple-gray hover:text-apple-blue">
            ← Back
          </button>
          <h1 className="text-xl font-semibold">Pilot Deck</h1>
          <div className="w-16"></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Stage Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {stages.map((stage) => (
            <button
              key={stage.id}
              onClick={() => isStageAccessible(stage.id) && setCurrentStage(stage.id)}
              disabled={!isStageAccessible(stage.id)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                currentStage === stage.id
                  ? `bg-${colors[stage.id - 1]} text-white`
                  : isStageAccessible(stage.id)
                  ? "bg-white text-gray-700 border border-gray-200"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              Stage {stage.id}
              {stage.completed && " ✓"}
            </button>
          ))}
        </div>

        {/* Current Stage Content */}
        {stages.map(
          (stage) =>
            stage.id === currentStage && (
              <section
                key={stage.id}
                className={`bg-white rounded-2xl p-6 shadow-sm border ${
                  !isStageAccessible(stage.id) ? "opacity-50" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">Stage {stage.id}: {stage.name}</h2>
                    <p className="text-apple-gray mt-1">{stage.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${colors[stage.id - 1]}/10 text-${colors[stage.id - 1]}`}>
                    {stage.completed ? "Completed" : stage.unlocked ? "In Progress" : "Locked"}
                  </span>
                </div>

                {/* Checklist */}
                <div className="space-y-3">
                  {stage.checklist.map((item) => (
                    <label
                      key={item.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                        item.completed
                          ? "bg-gray-50 border-gray-200"
                          : "bg-white border-gray-200 hover:border-apple-blue"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleChecklist(stage.id, item.id)}
                        className="w-5 h-5 rounded text-apple-blue"
                      />
                      <span className={item.completed ? "line-through text-gray-400" : "text-gray-900"}>
                        {item.text}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Complete Stage Button */}
                {isStageAccessible(stage.id) && !stage.completed && (
                  <button
                    onClick={() => handleCompleteStage(stage.id)}
                    className="mt-6 w-full py-3 bg-apple-blue text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                  >
                    Complete Stage {stage.id} →
                  </button>
                )}
              </section>
            )
        )}
      </main>
    </div>
  );
}
