import axios from "axios"

const host = "https://8b8e-95-59-155-216.ngrok-free.app"

export const getAllBooks = async () =>{
   const res =  await axios.get(host+'/api/Book');
   return res.data;
}

export const getAllCompare = async ( )=>{
   const res = await axios.get(host + "/compare")
   return res.data;
}

export const getTest = async ( )=>{
   const res = await axios.get(host + "/tests")
   return res.data;
}

export const getTestImage = async ( )=>{
   const res = await axios.get(host + "/testsImage")
   return res.data;
}