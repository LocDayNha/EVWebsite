import React, { useState } from "react";
import Select from "react-select";

const getStatusLabel = (isActive) => {
    switch (isActive) {
        case 1:
            return { text: "Chờ", color: "bg-yellow-300 text-white" };
        case 2:
            return { text: "Đang hoạt động", color: "bg-green-300 text-white" };
        case 3:
            return { text: "Bị hủy", color: "bg-red-400 text-white" };
        case 4:
            return { text: "Tạm dừng hoạt động", color: "bg-gray-400 text-white" };
        default:
            return { text: "Không xác định", color: "bg-gray-200 text-black" };
    }
};

const Station = ({ data }) => {
    const [selectedCharger, setSelectedCharger] = useState({});
    const [selectedService, setSelectedService] = useState({});

    return (
        <div className="p-4 border rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Danh sách trạm sạc</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2"></th>
                        <th className="border border-gray-300 px-4 py-2">Tên trạm</th>
                        <th className="border border-gray-300 px-4 py-2 w-40">Hãng trạm sạc</th>
                        <th className="border border-gray-300 px-4 py-2 w-85">Vị trí</th>
                        <th className="border border-gray-300 px-4 py-2">Giờ hoạt động</th>

                        <th className="border border-gray-300 px-4 py-2 w-50">Số lượng trụ sạc</th>
                        <th className="border border-gray-300 px-4 py-2 w-50">Dịch vụ</th>
                        <th className="border border-gray-300 px-4 py-2">Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((station) => {
                            const statusInfo = getStatusLabel(station.isActive);

                            // Danh sách trụ sạc cho dropdown
                            const chargerOptions = station.specification.map((charger) => ({
                                value: charger.specification_id._id,
                                label: `
                                ${charger.specification_id.port_id.name} 
                                 ${charger.specification_id.kw}kW 
                                  ${charger.specification_id.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })} 
                                   Cổng sạc ${charger.specification_id.slot}
                                   `,
                                image: charger.specification_id.port_id.image,
                            }));

                            // Danh sách dịch vụ cho dropdown
                            const serviceOptions = station.service.map((service) => ({
                                value: service.service_id.name,
                                label: service.service_id.name,
                                image: service.service_id.image,
                            }));

                            return (
                                <React.Fragment key={station._id}>
                                    <tr className="border border-gray-300">
                                        <td className="border border-gray-300 px-4 py-2">{station.name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{station.name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{station.brand_id.name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{station.location}</td>
                                        <td className="border border-gray-300 px-4 py-2">{station.time}</td>

                                        {/* Dropdown Trụ Sạc */}
                                        <td className="border border-gray-300 px-4 py-2 relative text-center align-middle">
                                            <Select
                                                options={chargerOptions}
                                                isSearchable={false}
                                                value={selectedCharger[station._id] || null}
                                                getOptionLabel={(e) => (
                                                    <div className="flex items-center">
                                                        <img src={e.image} alt={e.label} className="w-12 h-12" />
                                                        {e.label}
                                                    </div>
                                                )}
                                                // onChange={(selected) => setSelectedCharger({ ...selectedCharger, [station._id]: selected })}
                                                menuPortalTarget={document.body}
                                                styles={{
                                                    menuPortal: (base) => ({ ...base, zIndex: 9999, width: 340, }),
                                                    menu: (abcd) => ({ ...abcd, overflow: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' })
                                                }}
                                                placeholder={station.specification.length + ' trụ sạc'}
                                            />
                                        </td>

                                        {/* Dropdown Dịch Vụ */}
                                        <td className="border border-gray-300 px-4 py-2 relative">
                                            <Select
                                                options={serviceOptions}
                                                isSearchable={false}
                                                menuPortalTarget={document.body}
                                                value={null}
                                                getOptionLabel={(e) => (
                                                    <div className="flex items-center">
                                                        <img src={e.image} alt={e.label} className="w-6 h-6 mr-2" />
                                                        {e.label}
                                                    </div>
                                                )}
                                                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                                                placeholder="Dịch vụ"
                                            />

                                        </td>

                                        <td className={`border border-gray-300 px-4 py-2 text-center font-semibold ${statusInfo.color}`}>
                                            {statusInfo.text}
                                        </td>
                                    </tr>
                                </React.Fragment>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={9} className="text-center py-4">
                                Không có trạm sạc nào
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Station;
