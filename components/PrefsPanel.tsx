"use client";

import { useState } from "react";
import { CATEGORIES, CITIES, JOB_TYPES } from "@/lib/taxonomy";
import { EMPTY_PREFS } from "@/lib/prefs";
import type { Category, JobType, Prefs } from "@/lib/types";

function toggle<T>(arr: T[], v: T): T[] {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm border transition ${
        active
          ? "border-brand-600 bg-brand-600 text-white"
          : "border-gray-200 bg-white text-gray-600 hover:border-brand-500"
      }`}
    >
      {children}
    </button>
  );
}

export default function PrefsPanel({
  open,
  prefs,
  onSave,
  onClose,
}: {
  open: boolean;
  prefs: Prefs;
  onSave: (p: Prefs) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<Prefs>(prefs);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-0 sm:p-4" onClick={onClose}>
      <div
        className="bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl p-6 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-bold">设置我的求职方向</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-xl leading-none">
            ×
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-5">
          选择你的偏好，匹配的岗位会在「综合推荐」里优先靠前。偏好只保存在你的浏览器本地。
        </p>

        <div className="space-y-5">
          <div>
            <div className="text-sm font-medium mb-2">意向行业</div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <Chip key={c} active={draft.categories.includes(c)} onClick={() => setDraft({ ...draft, categories: toggle<Category>(draft.categories, c) })}>
                  {c}
                </Chip>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-2">岗位类型</div>
            <div className="flex flex-wrap gap-2">
              {JOB_TYPES.map((t) => (
                <Chip key={t} active={draft.jobTypes.includes(t)} onClick={() => setDraft({ ...draft, jobTypes: toggle<JobType>(draft.jobTypes, t) })}>
                  {t}
                </Chip>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-2">意向城市</div>
            <div className="flex flex-wrap gap-2">
              {CITIES.map((c) => (
                <Chip key={c} active={draft.cities.includes(c)} onClick={() => setDraft({ ...draft, cities: toggle<string>(draft.cities, c) })}>
                  {c}
                </Chip>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setDraft(EMPTY_PREFS)}
            className="px-4 py-2 rounded-lg text-sm border border-gray-200 text-gray-600 hover:border-gray-300"
          >
            清空
          </button>
          <button
            onClick={() => {
              onSave(draft);
              onClose();
            }}
            className="flex-1 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700"
          >
            保存并应用
          </button>
        </div>
      </div>
    </div>
  );
}
