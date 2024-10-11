

export const formatPrice=(price)=>{
  return Intl.NumberFormat('en-IN',{
    style:"currency",
    currency:"INR"
  }).format(price)
}
