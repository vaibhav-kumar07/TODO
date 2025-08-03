import { useState } from "react";

const demoGyms = [
    {
        id: "1",
        name: "Iron Titan Gym",
        image: "https://source.unsplash.com/200x200/?gym,fitness",
    },
    {
        id: "2",
        name: "Muscle Factory",
        image: "https://source.unsplash.com/200x200/?workout,gym",
    },
    {
        id: "3",
        name: "Beast Mode Fitness",
        image: "https://source.unsplash.com/200x200/?weights,exercise",
    },
];

const GymSelectDropdown = ({
    onSelect,
}: {
    onSelect: (id: string) => void;
}) => {
    const [selectedGym, setSelectedGym] = useState<string | null>(null);

    return (
        <div className="space-y-2">
            <select
                className="w-full p-2 border rounded-md"
                onChange={(e) => {
                    setSelectedGym(e.target.value);
                    onSelect(e.target.value);
                }}
            >
                <option value="">Select a Gym</option>
                {demoGyms.map((gym) => (
                    <option key={gym.id} value={gym.id}>
                        {gym.name}
                    </option>
                ))}
            </select>

            {/* Display Selected Gym Image */}
            {selectedGym && (
                <div className="mt-2 flex items-center gap-3 p-2 border rounded-md shadow-sm">
                    <img
                        src={
                            demoGyms.find((gym) => gym.id === selectedGym)
                                ?.image ||
                            "https://source.unsplash.com/200x200/?fitness"
                        }
                        alt="Gym"
                        className="w-14 h-14 rounded-md object-cover"
                    />
                    <p className="font-medium text-gray-700">
                        {demoGyms.find((gym) => gym.id === selectedGym)?.name}
                    </p>
                </div>
            )}
        </div>
    );
};

export default GymSelectDropdown;
