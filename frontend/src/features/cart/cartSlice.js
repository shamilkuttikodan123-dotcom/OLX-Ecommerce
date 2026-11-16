import { createSlice } from "@reduxjs/toolkit";


const cartSlice =createSlice({

    name:'cart',
    initialState:{
        
        items:JSON.parse(localStorage.getItem('cart') || '[]')
    },
    reducers:{
        addtoCart :(state,action)=>{
            const existingItem=state.items.find((item)=>item.id === action.payload.id)
            if(existingItem){
                existingItem.quantity+=1

            }else{
                state.items.push({
                    ...action.payload,
                    quantity:1

                })

                
            }
        },

        increaseQuantity: (state, action) => {
            const item = state.items.find(
                (item) => item.id === action.payload
            );

            if (item) {
                item.quantity += 1;

            }

        },

        decreaseQuantity: (state, action) => {
            const item = state.items.find(
                (item) => item.id === action.payload
            );

            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;

                } else {
                    state.items = state.items.filter(
                        (item) => item.id !== action.payload
                    
                    );

                }
            }

        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );

             },

         clearCart: (state) => {
            state.items = [];
            localStorage.removeItem('cart')
                },


    }
}
)

export const {addtoCart,increaseQuantity,decreaseQuantity,removeFromCart,clearCart}=cartSlice.actions;
export default cartSlice.reducer
