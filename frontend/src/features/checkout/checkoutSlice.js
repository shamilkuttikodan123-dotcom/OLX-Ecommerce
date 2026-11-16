import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "http://127.0.0.1:8000/api";

export const checkout =createAsyncThunk(
    'checkout/checkout',
    async (productId,thunkAPI)=>{
        const access=thunkAPI.getState().auth.access
        try{
            const response=await fetch(`${API_URL}/checkout/`,{
                method:'POST',
                headers:{
                    "content-type" :"application/json",
                    Authorization:`Bearer ${access}`,
                   
                },
                 body:JSON.stringify({
                        product_ids:productId
                    })
            })

            const data =await response.json()
            if(!response.ok){
                return thunkAPI.rejectWithValue(data)
            }
            return data

        }catch(error){
            return thunkAPI.rejectWithValue({
                error:'net work error'
            })

        }
    }
)

const checkoutSlice=createSlice({
    name:'checkout',
    initialState:{
        loading:false,
        success:false,
        error:null
    },
    reducers:{}
    ,
    extraReducers:(builder)=>{
        builder
        .addCase(checkout.pending,(state)=>{
            state.loading=true,
            state.error=null,
            state.success=false
        })
        .addCase(checkout.fulfilled,(state)=>{
            state.loading=false,
            state.error=null,
            state.success=true
        })
        .addCase(checkout.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
            state.success=false
        })
    }


})

export default checkoutSlice.reducer;