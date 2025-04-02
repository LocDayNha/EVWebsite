import React, { useState, useEffect } from "react";
import Button from "../../../components/ui/Button";
import * as CardComponents from "../../../components/ui/Card";
import { FaChargingStation, FaUsers, FaBuilding, FaUserFriends, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Loading from "../../../components/item/Loading";
import chargingStation from "../../../assets/image/main/home/charging-station.png";
import managementImage from "../../../assets/image/main/home/management-system.png";
import image1 from "../../../assets/image/main/home/image1.png"
import image2 from "../../../assets/image/main/home/image2.png"
import image3 from "../../../assets/image/main/home/image3.png"
import AppStore from "../../../assets/image/main/home/AppStore.png"
import GooglePlay from "../../../assets/image/main/home/GooglePlay.png"


const Home = () => {
    const [loading, setLoading] = useState(true);
    const { Card, CardContent } = CardComponents;

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="w-full">
            {/* Navigation Bar */}
            <nav className="bg-white shadow-md py-4 px-6">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold text-green-600">EV Website</h1>
                    <div className="flex items-center space-x-6">
                        <a href="#" className="text-gray-700 hover:text-green-600">Trạm sạc</a>
                        <a href="#" className="text-gray-700 hover:text-green-600">Bản đồ</a>
                        <a href="#" className="text-gray-700 hover:text-green-600">Lộ trình</a>
                        <a href="#" className="text-gray-700 hover:text-green-600">Cài đặt</a>
                        <a href="#" className="text-gray-700 hover:text-green-600">Công nghệ</a>
                        <a href="/login" className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition duration-300">
                            Đăng nhập
                        </a>
                    </div>
                </div>
            </nav>
            <hr></hr>

            {/* Hero Section with Image */}
            <section className="py-16 px-4 max-w-6xl mx-auto bg-white">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="md:w-3/5">
                        <h2 className="text-3xl font-bold text-green-600 mb-6">Cung cấp dữ liệu trạm sạc xe điện</h2>
                        <div className="space-y-4 text-gray-600">
                            <p>
                                Ứng dụng cung cấp dữ liệu chi tiết về các trạm sạc xe điện trên khắp Việt Nam, giúp người dùng dễ dàng tìm kiếm và tiếp cận nguồn năng lượng một cách thuận tiện.
                            </p>
                            <p>
                                Với hệ thống thông tin đầy đủ về vị trí, loại cổng sạc, công suất, giá cả, tình trạng hoạt động và các tiện ích đi kèm, ứng dụng mang đến trải nghiệm tối ưu cho người sử dụng xe điện.
                            </p>
                        </div>
                    </div>

                    <div className="md:w-2/5 flex justify-center">
                        <img
                            src={chargingStation}
                            alt="Trạm sạc xe điện"
                            className="max-w-[350px] w-full h-auto rounded-lg shadow-md object-cover"
                        />
                    </div>
                </div>
            </section>
            <hr />

            {/* Hằng Sạc Section */}
            <section className="py-16 px-4 max-w-6xl mx-auto bg-gray-50">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-green-600">Hãng Sạc</h2>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Chúng tôi cung cấp nhiều thông tin về các hãng sạc xe điện tại Việt Nam
                    </p>
                </div>

                <div className="flex justify-between gap-6 max-w-xl mx-auto mb-[29px]">
                    {/* 7 nút tròn đơn giản */}
                    <button className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"></button>
                    <button className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"></button>
                    <button className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"></button>
                    <button className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"></button>
                    <button className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"></button>
                    <button className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"></button>
                    <button className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"></button>
                </div>

                <div className="text-center mb-12">
                    <h3 className="text-xl font-semibold mb-2 ">Theo dõi thông tin, quản lý trạm sạc của bạn</h3>
                    <p className="text-gray-600 mb-6">EV Website phù hợp với bạn?</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Community */}
                    <Card>
                        <CardContent className="p-6 text-center">
                            <FaUsers className="text-green-600 text-4xl mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Cộng đồng</h3>
                            <p className="text-gray-600 mb-4">
                                Tiếp nhận và cập nhật thông tin các trạm sạc do người dùng chia sẻ. Thông tin được kiểm tra và xác minh.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Business */}
                    <Card>
                        <CardContent className="p-6 text-center">
                            <FaBuilding className="text-green-600 text-4xl mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Doanh nghiệp</h3>
                            <p className="text-gray-600 mb-4">
                                Thông tin về tài chính và chính sách thanh toán. Giúp doanh nghiệp tìm hiểu điểm sạc phù hợp.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Groups */}
                    <Card>
                        <CardContent className="p-6 text-center">
                            <FaUserFriends className="text-green-600 text-4xl mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Hội nhóm</h3>
                            <p className="text-gray-600 mb-4">
                                Thông tin các trạm sạc được quản lý bởi các tổ chức, xây dựng tiêu chuẩn và quyền sử dụng.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section className="py-16 px-4 max-w-6xl mx-auto bg-white">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Image - Hiển thị bên trái trên desktop */}
                    <div className="md:w-1/2 md:order-first order-last">
                        <img
                            src={managementImage}
                            alt="Hệ thống quản lý trạm sạc"
                            className="w-full h-auto rounded-xl shadow-md object-cover border border-gray-200"
                        />
                    </div>

                    {/* Text Content - Hiển thị bên phải trên desktop */}
                    <div className="md:w-1/2">
                        <h2 className="text-3xl font-bold text-green-600 mb-6">
                            Quản lý và tìm kiếm trạm sạc dễ dàng hơn bao giờ hết
                        </h2>

                        <div className="space-y-4 text-gray-600 mb-8">
                            <p>
                                Hệ thống cung cấp thông tin chính xác và đầy đủ về các trạm sạc xe điện.
                                Quản lý thông tin minh bạch giúp phát triển đồng thời kinh doanh và tiện ích cho người dùng.
                            </p>
                            <p>
                                Chúng tôi tích hợp đa dạng các trạm sạc từ nhiều nhà cung cấp, hiển thị
                                đầy đủ thông tin về vị trí, tình trạng hoạt động và các tiện ích đi kèm.
                            </p>
                        </div>
                        <Button className="bg-green-600 text-white hover:bg-green-700 px-8 py-3">
                            Khám phá ngay
                        </Button>
                    </div>
                </div>
            </section>

            <section className="py-16 px-4 max-w-6xl mx-auto bg-white text-center">
                <h2 className="text-3xl font-bold text-green-600 mb-4">Sạc điện thông minh – Cập nhật xu hướng mới nhất</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-12">
                    Chúng tôi tổng hợp thông tin về các trạm sạc, công nghệ mới và xu hướng phát triển bền vững.
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Article 1 */}
                    <div className="relative group">
                        <div className="overflow-hidden rounded-lg h-64">
                            <img
                                src={image1}
                                alt="Công nghệ sạc"
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className="absolute -bottom-15 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-md w-5/6">
                            <h3 className="text-lg font-semibold mb-2 text-center">Những công nghệ giúp tối ưu hiệu suất trạm sạc</h3>
                            <a href="#" className="text-green-600 hover:text-green-700 font-semibold flex justify-center items-center">
                                Xem thêm →
                            </a>
                        </div>
                    </div>

                    {/* Article 2 */}
                    <div className="relative group">
                        <div className="overflow-hidden rounded-lg h-64">
                            <img
                                src={image2}
                                alt="Tìm trạm sạc"
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className="absolute -bottom-15 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-md w-5/6">
                            <h3 className="text-lg font-semibold mb-2 text-center">Làm thế nào để tìm trạm sạc nhanh chóng và hiệu quả?</h3>
                            <a href="#" className="text-green-600 hover:text-green-700 font-semibold flex justify-center items-center">
                                Xem thêm →
                            </a>
                        </div>
                    </div>

                    {/* Article 3 */}
                    <div className="relative group">
                        <div className="overflow-hidden rounded-lg h-64">
                            <img
                                src={image3}
                                alt="Hạ tầng sạc điện"
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className="absolute -bottom-15 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-md w-5/6">
                            <h3 className="text-lg font-semibold mb-2 text-center">Sự phát triển của hạ tầng sạc điện tại Việt Nam</h3>
                            <a href="#" className="text-green-600 hover:text-green-700 font-semibold flex justify-center items-center">
                                Xem thêm →
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 max-w-6xl mx-auto bg-gray-50 text-center">
                {/* Nhóm tiêu đề với kích thước lớn */}
                <div className="mb-10 space-y-3">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                        Trải nghiệm giải pháp tìm kiếm
                    </h1>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                        trạm sạc thông minh
                    </h1>
                </div>

                {/* Nút với kích thước chữ lớn */}
                <button className="bg-green-600 hover:bg-green-700 text-white text-xl md:text-2xl font-semibold px-10 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Dùng thử ngay →
                </button>
            </section>

            {/* Simplified Footer Section */}
            <footer className="bg-white py-8 border-t">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-gray-700">

                        {/* Cột 1 - Product */}
                        <div>
                            <h3 className="font-semibold mb-3">Product</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:underline">Giá cả</a></li>
                                <li><a href="#" className="hover:underline">Giải pháp</a></li>
                                <li><a href="#" className="hover:underline">Giáo dục</a></li>
                                <li><a href="#" className="hover:underline">Kế hoạch nhóm</a></li>
                            </ul>
                        </div>

                        {/* Cột 2 - Về chúng tôi */}
                        <div>
                            <h3 className="font-semibold mb-3">Về chúng tôi</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:underline">Giới thiệu</a></li>
                                <li><a href="#" className="hover:underline">Thương hiệu</a></li>
                                <li><a href="#" className="hover:underline">Tin tức</a></li>
                                <li><a href="#" className="hover:underline">Quan hệ</a></li>
                                <li><a href="#" className="hover:underline">Liên kết</a></li>
                            </ul>
                        </div>

                        {/* Cột 3 - Trợ giúp và hỗ trợ */}
                        <div>
                            <h3 className="font-semibold mb-3">Trợ giúp và hỗ trợ</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:underline">Trung tâm hỗ trợ</a></li>
                                <li><a href="#" className="hover:underline">Liên hệ với chúng tôi</a></li>
                                <li><a href="#" className="hover:underline">Điều khoản</a></li>
                                <li><a href="#" className="hover:underline">Thông tin an toàn</a></li>
                            </ul>
                        </div>

                        {/* Cột 4 - Cộng đồng + Hình ảnh App Store & Google Play */}
                        <div>
                            <h3 className="font-semibold mb-2">Cộng đồng</h3>
                            <ul className="space-y-1 mb-4">
                                <li>Đại lý</li>
                                <li>--</li>
                                <li>--</li>
                            </ul>
                            <div className="flex space-x-4">
                                <img src={AppStore} alt="App Store" className="h-10" />
                                <img src={GooglePlay} alt="Google Play" className="h-10" />
                            </div>
                        </div>
                    </div>

                    {/* Dòng dưới cùng */}
                    <div className="mt-6 border-t pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                        <p>@loccdaynha</p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:underline">Hỗ trợ</a>
                            <a href="#" className="hover:underline">Riêng tư</a>
                            <a href="#" className="hover:underline">Điều khoản</a>
                        </div>
                        <div>

                        </div>
                        <div className="flex items-center space-x-10">
                            {/* Các icon mạng xã hội */}
                            <div className="flex space-x-4">
                                <FaFacebookF className="text-gray-600 cursor-pointer" />
                                <FaTwitter className="text-gray-600 cursor-pointer" />
                                <FaInstagram className="text-gray-600 cursor-pointer" />
                            </div>
                            {/* Tiếng Việt Option */}
                            <div className="flex items-center">
                                <span>Tiếng Việt</span>
                                <svg className="w-4 h-4 ml-1" /* Icon dropdown */ />
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;

