import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetTotalPrice } from "@/lib/hooks/useGetTotalPrice"

export function OrderSummary() {
  const totalCartPrie = useGetTotalPrice()
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium">Total:</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-3xl font-bold">{totalCartPrie.toFixed(2)} $</div>

          <div className="space-y-2">
            <div className="flex justify-between text-lg items-center">
              <span>Cart total:</span>
              <span className="font-bold">{totalCartPrie.toFixed(2)} $</span>
            </div>
            <div className="flex justify-between text-lg items-center">
              <span>Tax fee:</span>
              <span className="font-bold">11 $</span>
            </div>
            <div className="flex justify-between text-lg items-center">
              <span>Delivery fee:</span>
              <span className="font-bold">11 $</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
