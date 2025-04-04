
const listStationEV = [
    {
        "_id": "1",
        "name": "Saigon Zoo & Botanical Gardens",
        "location": "2 Đ. Nguyễn Bỉnh Khiêm, Bến Nghé, Quận 1, Hồ Chí Minh",
        "lat": "10.787330351035319",
        "lng": "106.70507093840628"
    },
    {
        "_id": "2",
        "name": "Vincom Center Landmark 81",
        "location": "208 Nguyễn Hữu Cảnh, Phường 22, Bình Thạnh, Hồ Chí Minh",
        "lat": "10.793017",
        "lng": "106.721897"
    },
    {
        "_id": "3",
        "name": "AEON Mall Tân Phú",
        "location": "30 Bờ Bao Tân Thắng, Sơn Kỳ, Tân Phú, Hồ Chí Minh",
        "lat": "10.803902",
        "lng": "106.626391"
    },
    {
        "_id": "4",
        "name": "Big C Thăng Long",
        "location": "222 Trần Duy Hưng, Trung Hoà, Cầu Giấy, Hà Nội",
        "lat": "21.007002",
        "lng": "105.798742"
    },
    {
        "_id": "5",
        "name": "VinFast Showroom Đà Nẵng",
        "location": "910A Nguyễn Hữu Thọ, Hải Châu, Đà Nẵng",
        "lat": "16.031285",
        "lng": "108.221420"
    },
    {
        "_id": "6",
        "name": "Vincom Mega Mall Royal City",
        "location": "72A Nguyễn Trãi, Thanh Xuân, Hà Nội",
        "lat": "21.000742",
        "lng": "105.816146"
    },
    {
        "_id": "7",
        "name": "Trạm sạc EVN Hà Nội",
        "location": "11 Cửa Bắc, Ba Đình, Hà Nội",
        "lat": "21.038382",
        "lng": "105.840126"
    },
    {
        "_id": "8",
        "name": "Trạm sạc Bitexco Tower",
        "location": "2 Hải Triều, Bến Nghé, Quận 1, Hồ Chí Minh",
        "lat": "10.771944",
        "lng": "106.704167"
    },
    {
        "_id": "9",
        "name": "Trạm sạc Crescent Mall",
        "location": "101 Tôn Dật Tiên, Phú Mỹ Hưng, Quận 7, Hồ Chí Minh",
        "lat": "10.729722",
        "lng": "106.722500"
    },
    {
        "_id": "10",
        "name": "Trạm sạc Đại học Bách Khoa Hà Nội",
        "location": "1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội",
        "lat": "21.005017",
        "lng": "105.841328"
    },
    {
        "_id": "11",
        "name": "Trạm sạc Đà Lạt Center",
        "location": "1 Quang Trung, Phường 9, Đà Lạt",
        "lat": "11.941667",
        "lng": "108.438333"
    },
    {
        "_id": "12",
        "name": "Trạm sạc Nha Trang Center",
        "location": "20 Trần Phú, Lộc Thọ, Nha Trang",
        "lat": "12.250000",
        "lng": "109.191667"
    },
    {
        "_id": "13",
        "name": "Trạm sạc Hải Phòng Vincom",
        "location": "4 Lạch Tray, Ngô Quyền, Hải Phòng",
        "lat": "20.861111",
        "lng": "106.688889"
    },
    {
        "_id": "14",
        "name": "Trạm sạc Huế Imperial",
        "location": "8 Lê Lợi, Phú Hội, Huế",
        "lat": "16.466667",
        "lng": "107.583333"
    },
    {
        "_id": "15",
        "name": "Trạm sạc Vũng Tàu Back Beach",
        "location": "10 Trần Phú, Phường 1, Vũng Tàu",
        "lat": "10.345833",
        "lng": "107.084722"
    },
    {
        "_id": "16",
        "name": "Trạm sạc Đại học Quốc gia HCM",
        "location": "Khu phố 6, Linh Trung, Thủ Đức, Hồ Chí Minh",
        "lat": "10.880000",
        "lng": "106.791667"
    },
    {
        "_id": "17",
        "name": "Trạm sạc Cần Thơ Vincom",
        "location": "209 30/4, Xuân Khánh, Ninh Kiều, Cần Thơ",
        "lat": "10.033333",
        "lng": "105.783333"
    },
    {
        "_id": "18",
        "name": "Trạm sạc Phú Quốc Center",
        "location": "125 Trần Hưng Đạo, Dương Đông, Phú Quốc",
        "lat": "10.216667",
        "lng": "103.966667"
    },
    {
        "_id": "19",
        "name": "Trạm sạc Bình Dương Aeon Mall",
        "location": "1 Đại lộ Bình Dương, Thuận Giao, Thuận An, Bình Dương",
        "lat": "10.933333",
        "lng": "106.716667"
    },
    {
        "_id": "20",
        "name": "Trạm sạc Đồng Nai Big C",
        "location": "1 Phạm Văn Thuận, Biên Hòa, Đồng Nai",
        "lat": "10.950000",
        "lng": "106.816667"
    },
    {
        "_id": "21",
        "name": "Trạm sạc Quy Nhơn Harbor",
        "location": "2 Nguyễn Huệ, Quy Nhơn",
        "lat": "13.766667",
        "lng": "109.233333"
    },
    {
        "_id": "22",
        "name": "Trạm sạc Buôn Ma Thuột Center",
        "location": "1 Nguyễn Tất Thành, Buôn Ma Thuột",
        "lat": "12.666667",
        "lng": "108.050000"
    },
    {
        "_id": "23",
        "name": "Trạm sạc Long Xuyên Plaza",
        "location": "1 Nguyễn Trãi, Long Xuyên",
        "lat": "10.383333",
        "lng": "105.433333"
    },
    {
        "_id": "24",
        "name": "Trạm sạc Rạch Giá Central",
        "location": "1 Nguyễn Trung Trực, Rạch Giá",
        "lat": "10.016667",
        "lng": "105.083333"
    },
    {
        "_id": "25",
        "name": "Trạm sạc Mỹ Tho Riverside",
        "location": "1 Ấp Bắc, Mỹ Tho",
        "lat": "10.350000",
        "lng": "106.366667"
    },
    {
        "_id": "26",
        "name": "Trạm sạc Vĩnh Long Market",
        "location": "1 Hùng Vương, Vĩnh Long",
        "lat": "10.250000",
        "lng": "105.966667"
    },
    {
        "_id": "27",
        "name": "Trạm sạc Bến Tre Center",
        "location": "1 Đồng Khởi, Bến Tre",
        "lat": "10.233333",
        "lng": "106.383333"
    },
    {
        "_id": "28",
        "name": "Trạm sạc Tây Ninh Plaza",
        "location": "1 30/4, Tây Ninh",
        "lat": "11.316667",
        "lng": "106.100000"
    },
    {
        "_id": "29",
        "name": "Trạm sạc Đồng Tháp Center",
        "location": "1 Nguyễn Sinh Sắc, Cao Lãnh",
        "lat": "10.466667",
        "lng": "105.633333"
    },
    {
        "_id": "30",
        "name": "Trạm sạc An Giang Plaza",
        "location": "1 Trần Hưng Đạo, Long Xuyên",
        "lat": "10.383333",
        "lng": "105.433333"
    },
    {
        "_id": "31",
        "name": "Trạm sạc Sóc Trăng Center",
        "location": "1 Lê Duẩn, Sóc Trăng",
        "lat": "9.600000",
        "lng": "105.966667"
    },
    {
        "_id": "32",
        "name": "Trạm sạc Bạc Liêu Plaza",
        "location": "1 Hùng Vương, Bạc Liêu",
        "lat": "9.283333",
        "lng": "105.716667"
    },
    {
        "_id": "33",
        "name": "Trạm sạc Cà Mau Central",
        "location": "1 Nguyễn Tất Thành, Cà Mau",
        "lat": "9.183333",
        "lng": "105.150000"
    },
    {
        "_id": "34",
        "name": "Trạm sạc Kiên Giang Harbor",
        "location": "1 Nguyễn Trung Trực, Rạch Giá",
        "lat": "10.016667",
        "lng": "105.083333"
    },
    {
        "_id": "35",
        "name": "Trạm sạc Hậu Giang Plaza",
        "location": "1 Lý Tự Trọng, Vị Thanh",
        "lat": "9.783333",
        "lng": "105.466667"
    },
    {
        "_id": "36",
        "name": "Trạm sạc Trà Vinh Center",
        "location": "1 Lê Lợi, Trà Vinh",
        "lat": "9.933333",
        "lng": "106.350000"
    },
    {
        "_id": "37",
        "name": "Trạm sạc Vĩnh Phúc Vincom",
        "location": "1 Nguyễn Tất Thành, Vĩnh Yên",
        "lat": "21.316667",
        "lng": "105.600000"
    },
    {
        "_id": "38",
        "name": "Trạm sạc Phú Thọ Plaza",
        "location": "1 Hùng Vương, Việt Trì",
        "lat": "21.300000",
        "lng": "105.433333"
    },
    {
        "_id": "39",
        "name": "Trạm sạc Thái Nguyên Center",
        "location": "1 Hoàng Văn Thụ, Thái Nguyên",
        "lat": "21.600000",
        "lng": "105.850000"
    },
    {
        "_id": "40",
        "name": "Trạm sạc Lạng Sơn Plaza",
        "location": "1 Trần Đăng Ninh, Lạng Sơn",
        "lat": "21.833333",
        "lng": "106.733333"
    },
    {
        "_id": "41",
        "name": "Trạm sạc Bắc Giang Central",
        "location": "1 Nguyễn Văn Cừ, Bắc Giang",
        "lat": "21.283333",
        "lng": "106.200000"
    },
    {
        "_id": "42",
        "name": "Trạm sạc Bắc Ninh Vincom",
        "location": "1 Trần Hưng Đạo, Bắc Ninh",
        "lat": "21.183333",
        "lng": "106.050000"
    },
    {
        "_id": "43",
        "name": "Trạm sạc Hà Nam Plaza",
        "location": "1 Lý Thường Kiệt, Phủ Lý, Hà Nam",
        "lat": "20.541111",
        "lng": "105.918611"
    },
    {
        "_id": "44",
        "name": "Trạm sạc Nam Định Center",
        "location": "1 Trần Hưng Đạo, Nam Định",
        "lat": "20.438333",
        "lng": "106.162500"
    },
    {
        "_id": "45",
        "name": "Trạm sạc Ninh Bình Plaza",
        "location": "1 Lê Đại Hành, Ninh Bình",
        "lat": "20.251389",
        "lng": "105.974167"
    },
    {
        "_id": "46",
        "name": "Trạm sạc Thanh Hóa Vincom",
        "location": "1 Trần Phú, Thanh Hóa",
        "lat": "19.800000",
        "lng": "105.766667"
    },
    {
        "_id": "47",
        "name": "Trạm sạc Nghệ An Central",
        "location": "1 Nguyễn Sỹ Sách, Vinh, Nghệ An",
        "lat": "18.666667",
        "lng": "105.666667"
    },
    {
        "_id": "48",
        "name": "Trạm sạc Hà Tĩnh Plaza",
        "location": "1 Hà Huy Tập, Hà Tĩnh",
        "lat": "18.342778",
        "lng": "105.905833"
    },
    {
        "_id": "49",
        "name": "Trạm sạc Quảng Bình Center",
        "location": "1 Hữu Nghị, Đồng Hới",
        "lat": "17.483333",
        "lng": "106.600000"
    },
    {
        "_id": "50",
        "name": "Trạm sạc Quảng Trị Plaza",
        "location": "1 Lê Duẩn, Đông Hà",
        "lat": "16.816667",
        "lng": "107.100000"
    },
    {
        "_id": "51",
        "name": "Trạm sạc Quảng Nam Vincom",
        "location": "1 Hùng Vương, Tam Kỳ",
        "lat": "15.566667",
        "lng": "108.483333"
    },
    {
        "_id": "52",
        "name": "Trạm sạc Quảng Ngãi Center",
        "location": "1 Nguyễn Trãi, Quảng Ngãi",
        "lat": "15.116667",
        "lng": "108.800000"
    },
    {
        "_id": "53",
        "name": "Trạm sạc Kon Tum Plaza",
        "location": "1 Phan Đình Phùng, Kon Tum",
        "lat": "14.350000",
        "lng": "107.983333"
    },
    {
        "_id": "54",
        "name": "Trạm sạc Gia Lai Center",
        "location": "1 Trần Hưng Đạo, Pleiku",
        "lat": "13.983333",
        "lng": "108.000000"
    },
    {
        "_id": "55",
        "name": "Trạm sạc Lâm Đồng Plaza",
        "location": "1 Trần Phú, Bảo Lộc",
        "lat": "11.550000",
        "lng": "107.816667"
    },
    {
        "_id": "56",
        "name": "Trạm sạc Bình Thuận Vincom",
        "location": "1 Trần Hưng Đạo, Phan Thiết",
        "lat": "10.933333",
        "lng": "108.100000"
    },
    {
        "_id": "57",
        "name": "Trạm sạc Ninh Thuận Plaza",
        "location": "1 Thống Nhất, Phan Rang",
        "lat": "11.566667",
        "lng": "108.983333"
    },
    {
        "_id": "58",
        "name": "Trạm sạc Bình Phước Center",
        "location": "1 Nguyễn Huệ, Đồng Xoài",
        "lat": "11.533333",
        "lng": "106.883333"
    },
    {
        "_id": "59",
        "name": "Trạm sạc Tây Nguyên EcoMall",
        "location": "1 Lê Duẩn, Gia Lai",
        "lat": "13.983333",
        "lng": "108.000000"
    },
    {
        "_id": "60",
        "name": "Trạm sạc Cần Giờ Eco Park",
        "location": "1 Duyên Hải, Cần Giờ, Hồ Chí Minh",
        "lat": "10.411944",
        "lng": "106.962778"
    },
];

export default listStationEV;
