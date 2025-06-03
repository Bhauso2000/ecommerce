
'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { CartItemWithProduct, OrderHistoryItem } from '@/lib/interfaces/user-interface';
import apiMethodes from '@/lib/model/apimethods';
import { Order_API } from '@/lib/constant/customer-url';

export default function OrderHistoryPage() {
  const { data , isLoading, isError } = useQuery<OrderHistoryItem[]>({
    queryKey: ['order-history'],
    queryFn: ()=>apiMethodes.get(Order_API.History),
    refetchOnWindowFocus: false,
    initialData:[]
  });
 console.log('fdfd',data)

  return (
       <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>

      {data.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        data.map((order) => (
          <div key={order.id} className="mb-6 border p-4 rounded shadow-sm">
            <h2 className="text-lg font-semibold mb-2">
              Order placed on: {(new Date(order.createdAt), 'PPP')}
            </h2>

            <div className="space-y-4">
              {order.orderItems.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  <Image
                    src={item.productDetails.imageUrl}
                    alt={item.productDetails.name}
                    width={80}
                    height={80}
                    className="rounded object-cover"
                  />
                  <div>
                    <h3 className="font-medium">{item.productDetails.name}</h3>
                    <p className="text-sm text-gray-600">{item.productDetails.description}</p>
                    <p className="text-sm">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm">
                      Price: ${item.productDetails.price.toFixed(2)}
                    </p>
                    <p className="text-sm font-semibold">
                      Total: ${(item.quantity * item.productDetails.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
