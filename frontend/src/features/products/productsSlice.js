import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import React, { act } from 'react'
const API_URL = "http://127.0.0.1:8000/api";



export const fetchProduct=createAsyncThunk(
    'products/fetchproduct',
    async ({category,max_price},thunkAPI)=>{
        const access=thunkAPI.getState().auth.access;
        try{
            const params=new URLSearchParams();
            if(category){
                params.append('category',category)
            }
            
            if(max_price){
                params.append('max_price',max_price)
            }

            const response =await fetch(`${API_URL}/products/?${params.toString()}`,
            {
                headers:{
                    Authorization:`Bearer ${access}`
                }
            }

            )

            const data=await response.json()
            if(!response.ok){
                return thunkAPI.rejectWithValue(data)
            }
            return data

        }catch(error){
            return thunkAPI.rejectWithValue({
                error:'network error'
            })
       
        }

    }
)





export const myproduct=createAsyncThunk(
    'product/my',
    async (_,thunkAPI)=>{
        const access=thunkAPI.getState().auth.access
        try{
            const response=await fetch(`${API_URL}/products/my/`,{
                method:'GET',
                headers:{
                    Authorization:`Bearer ${access}`
                }
            })

            const data=await response.json()
            if(!response.ok){
                return thunkAPI.rejectWithValue(data)
            }
            return data



        }catch(err){
            return thunkAPI.rejectWithValue({error:'network error'})

        }
    }
)






export const addproduct =createAsyncThunk(
    'products/add',
    async (productData,thunkAPI)=>{
        const access=thunkAPI.getState().auth.access;
        console.log("Access token:", access);

        try{
            const response=await fetch(`${API_URL}/products/`,{
                method:'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access}`,
                },
                body:JSON.stringify(productData)

            })
            const data=await response.json()
            if(!response.ok){
                return thunkAPI.rejectWithValue(data)
            }

            return data
        }catch(error){
            return thunkAPI.rejectWithValue({
                error:'network error'
            })

        }

    }
)


export const updateproduct=createAsyncThunk(
    'products/update',
   async ({id,productData},thunkAPI)=>{
        const access=thunkAPI.getState().auth.access;
        try{
            const response=await fetch(`${API_URL}/products/${id}/`,{
                method:'PATCH',
                headers:{
                    'content-Type':'application/json',
                    Authorization:`Bearer ${access}`
                },
                body:JSON.stringify(productData)

            })

            const data =await response.json()
            if(!response.ok){
                return thunkAPI.rejectWithValue(data)
            }
            return data
            
        }catch(error){
            return thunkAPI.rejectWithValue({
                error:'network error'
            })

        }
    }
)




const productsSlice=createSlice({

    name:'products',
    initialState:{
        items:[],
        myitems:[],
        loading:false,
        error:null,
    },
    
        reducers:{},
        extraReducers:(builder)=>{
          builder
          .addCase(fetchProduct.pending,(state)=>{
            state.loading=true,
            state.error=null
          })

          .addCase(fetchProduct.fulfilled,(state,action)=>{
            state.loading=false;
            state.items =action.payload
            state.error=null

          })

          .addCase(fetchProduct.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload
          })

          .addCase(addproduct.pending,(state)=>{
            state.loading=true,
            state.error=null
          })

          .addCase(addproduct.fulfilled,(state,action)=>{
            state.loading=false,
            state.error=null
            state.items.push(action.payload)
          })

          .addCase(addproduct.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload
          })

          .addCase(updateproduct.pending, (state) => {
           state.loading = true;
           state.error = null;
          })


          .addCase(updateproduct.fulfilled,(state,action)=>{
            state.loading=false
            const index=state.items.findIndex((item)=>item.id ==action.payload.id)

            if (index !== -1) {
                    state.items[index] = action.payload;
                }

            state.error = null;

          })


        .addCase(updateproduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        .addCase(myproduct.pending,(state)=>{
            state.loading=true
            state.error=null
        })

        .addCase(myproduct.fulfilled,(state,action)=>{
            state.loading=false
            state.myitems=action.payload
            state.error=null
        })

        .addCase(myproduct.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })

        }
    

})


export default productsSlice.reducer;




