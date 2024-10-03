"use client";

import { useState } from "react";

type Tab = {
    label: string;
    content: React.ReactNode;
};

type TabsProps = {
    tabs: Tab[];
};

export function Tabs({ tabs }: TabsProps) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div>
            <div className="flex border-b">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`px-4 py-2 ${
                            activeTab === index
                                ? "border-b-2 border-blue-500 text-blue-500"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="mt-4">{tabs[activeTab].content}</div>
        </div>
    );
}
