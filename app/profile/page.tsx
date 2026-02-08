
"use client";

import { useUserStore } from "@/lib/userStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User, Package, LogOut } from "lucide-react";

export default function ProfilePage() {
    const { user, logout } = useUserStore();
    const router = useRouter();
    const [profileData, setProfileData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }

        const fetchProfile = async () => {
            try {
                const res = await fetch(`/api/users/${user.id}`);
                if (res.ok) {
                    const data = await res.json();
                    setProfileData(data);
                }
            } catch (error) {
                console.error("Failed to fetch profile", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user, router]);

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 min-h-[60vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <h1 className="text-3xl font-bold mb-8">My Account</h1>

            <div className="grid md:grid-cols-3 gap-8">
                {/* User Info Card */}
                <div className="md:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="bg-orange-100 p-3 rounded-full">
                                <User className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                                <h2 className="font-semibold text-lg">{user.name}</h2>
                                <p className="text-gray-500 text-sm">{user.email}</p>
                            </div>
                        </div>

                        <div className="pt-4 border-t">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:text-red-600 transition-colors"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>

                {/* Orders History */}
                <div className="md:col-span-2 space-y-6">
                    <h2 className="text-2xl font-semibold flex items-center">
                        <Package className="w-6 h-6 mr-2" />
                        Order History
                    </h2>

                    {profileData?.orders && profileData.orders.length > 0 ? (
                        <div className="space-y-4">
                            {profileData.orders.map((order: any) => (
                                <div key={order.id} className="bg-white border rounded-lg overflow-hidden">
                                    <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-semibold">Order Placed</p>
                                            <p className="text-sm font-medium text-gray-900">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500 uppercase font-semibold">Total</p>
                                            <p className="text-sm font-medium text-gray-900">${order.totalAmount}</p>
                                        </div>
                                    </div>
                                    <div className="px-6 py-4">
                                        <div className="flow-root">
                                            <ul className="-my-4 divide-y divide-gray-200">
                                                {order.items.map((item: any) => (
                                                    <li key={item.id} className="flex py-4">
                                                        <div className="flex-shrink-0 h-10 w-10 border border-gray-200 rounded-md overflow-hidden">
                                                            <img
                                                                src={item.product?.image || '/placeholder.png'}
                                                                alt={item.product?.name || 'Product'}
                                                                className="h-full w-full object-cover object-center"
                                                            />
                                                        </div>
                                                        <div className="ml-4 flex-1">
                                                            <div className="flex items-center justify-between text-sm font-medium text-gray-900">
                                                                <h3>{item.product?.name || 'Product Name'}</h3>
                                                                <p className="ml-4">${item.price}</p>
                                                            </div>
                                                            <p className="mt-1 text-sm text-gray-500">Qty {item.quantity}</p>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-6 py-3 border-t">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <span className="font-medium mr-2">Status:</span>
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                                                    order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <Package className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No orders yet</h3>
                            <p className="mt-1 text-sm text-gray-500">Start shopping to see your orders here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
