type TabId = "electric" | "acoustic" | "bass";

interface BestSellingTabsProps {
    activeTab: TabId;
    setActiveTab: React.Dispatch<React.SetStateAction<TabId>>;
}

// Áp dụng kiểu dữ liệu vào component
export default function BestSellingTabs({ activeTab, setActiveTab }: BestSellingTabsProps) {
    const tabs: { id: TabId; name: string }[] = [
        { id: "electric", name: "Electric Guitars" },
        { id: "acoustic", name: "Acoustic Guitars" },
        { id: "bass", name: "Bass Guitars" },
    ];

    return (
        // flex space-x-6: Sắp xếp ngang với khoảng cách 1.5rem giữa các tab
        <div className="flex space-x-6 mb-4 text-lg">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    // Thêm class 'cursor-pointer' và 'focus:outline-none' cho khả năng truy cập
                    className={`
                        pb-1 text-gray-700 transition-colors duration-200 cursor-pointer focus:outline-none 
                        ${activeTab === tab.id
                            // Tab hoạt động: Viền dưới đen, chữ đen, font semi-bold
                            ? 'border-b-2 border-black font-semibold'
                            // Tab không hoạt động: Chữ xám đậm, hover sang đen
                            : 'hover:text-black'
                        }
                    `}
                >
                    {tab.name}
                </button>
            ))}
        </div>
    );
}