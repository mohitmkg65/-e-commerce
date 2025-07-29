'use client'
import { ArrowRightOutlined, DeleteOutlined, EditOutlined, PlusOutlined, SaveOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Card, Divider, Form, Input, InputNumber, message, Modal, Pagination, Popconfirm, Result, Skeleton, Tag, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import '@ant-design/v5-patch-for-react-19';
import clientCatchError from '@/lib/client-catch-error'
import axios from 'axios'
import useSWR, { mutate } from 'swr'
import { debounce } from 'lodash'
import Fetcher from '@/lib/fetcher'

const Products = () => {
  const [productForm] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(16)
  const [products, setProducts] = useState({data: [], total: 0})

  const {data, error, isLoading} = useSWR(`/api/product?page=${page}&limit=${limit}`, Fetcher)

  useEffect(() => {
    if(data)
      setProducts(data)
  }, [data])

  const onSearch = debounce(async (event: any)=>{
    try {
      const value = event.target.value.trim()
      const {data} = await axios.get(`/api/product?search=${value}`)
      setProducts(data)
    } catch (error) {
      clientCatchError(error)
    }
  }, 1000)
  
  const handleClose = ()=>{
    setOpen(false)
    productForm.resetFields()
    setEditId(null)
  }

  const createProduct = async (values: any)=>{
    try {
      values.image = values.image.file.originFileObj
      const formData = new FormData()
      for(let key in values){
        formData.append(key, values[key])
      }
      const {data} = await axios.post('/api/product', formData)
      message.success("Product added successfully")
      handleClose()
    } catch (error) {
      clientCatchError(error)
    }
  }

  const onPaginate = (page: number, limit: number) => {
    setPage(page)
    setLimit(limit)
  }

  const editProduct = (item: any) => {
    setEditId(item._id)
    setOpen(true)
    productForm.setFieldsValue(item)
  }

  const deleteProduct = async(id: string) => {
    try {
      await axios.delete(`/api/product/${id}`)
      mutate(`/api/product?page=${page}&limit=${limit}`)
      message.success("Product deleted successfully")
    } catch (error) {
      clientCatchError(error)
    }
  }

  const saveProduct = async (values: any) => {
    try {
      await axios.put(`/api/product/${editId}`, values)
      handleClose()
      mutate(`/api/product?page=${page}&limit=${limit}`)
      message.success("Product edited successfully")
    } catch (error) {
      clientCatchError(error)
    }
  }

  const changeImage = async ( id: string) => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.click()

    input.onchange = async () => {
      if(!input.files)
        return 
      const file = input.files[0]
      input.remove()
      const formData = new FormData()
      formData.append("id", id)
      formData.append("image", file)
      await axios.put("/api/product/change-image", formData)
      mutate(`/api/product?page=${page}&limit=${limit}`)
      message.success("Image changed successfully")
    }
  }

  if(isLoading)
    return <Skeleton active />

  if(error) 
    return <Result status="error" title={error} />

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex justify-between items-center'>
        <Input className='!w-[350px]' size='large' onChange={onSearch} placeholder='Search this site' />
        <Button onClick={()=>setOpen(true)} type='primary' size='large' icon={<PlusOutlined />} className='!bg-indigo-500'>Add product</Button>
      </div>

      <div className='grid grid-cols-4 gap-8'>
        {
          products.data.map((item:any, index:number)=>(
            <Card key={index} hoverable cover={
                <div className='relative w-full h-[180px]'>
                  <Popconfirm title="Do you want to change image ?" onConfirm={() => changeImage(item._id)}>
                    <Image src={item.image} layout="fill" alt={`product-${index}`} objectFit='cover' className='rounded-t-lg'/>
                  </Popconfirm>
                </div>
              }
              actions={[ 
                <EditOutlined key="edit" className='!text-green-400' onClick={() => editProduct(item)} />, 
                <Popconfirm title="Do you want to delete product ?" onConfirm={() => deleteProduct(item._id)} >
                  <DeleteOutlined key="delete" className='!text-rose-400'/>
                </Popconfirm>
              ]} 
            >
              <Card.Meta  title={item.title} description={
                  <div className='flex gap-2'>
                    <label>₹{item.price}</label>
                    <del>₹{item.price}</del>
                    <label>({item.discount}% Off)</label>
                  </div>
                }
              />
              <Tag className='!mt-5' color="cyan">{item.quantity} PCS</Tag>
            </Card>
          ))
        }
      </div>

      <div className="flex justify-end">
        <Pagination total={data.total} onChange={onPaginate} current={page} pageSizeOptions={[16, 32,64,100]} defaultPageSize={limit} />
      </div>

      <Modal open={open} width={720} centered footer={null} onCancel={handleClose} maskClosable={false}>
        <h1 className='text-lg font-medium'>Add a new product</h1>
        <Divider />
        <Form layout='vertical' onFinish={editId ? saveProduct : createProduct} form={productForm}>
          <Form.Item label="Product name" name="title" rules={[{required: true}]} >
            <Input size='large' placeholder='Enter product name' />
          </Form.Item>

          <div className='grid grid-cols-3 gap-6'>
            <Form.Item label="Price" name="price" rules={[{required: true, type: "number"}]} >
              <InputNumber size='large' placeholder='00.00' className='!w-full' controls={false} />
            </Form.Item>

            <Form.Item label="Discount" name="discount" rules={[{required: true, type: "number"}]} >
              <InputNumber size='large' placeholder='20' className='!w-full' />
            </Form.Item>

            <Form.Item label="Quantity" name="quantity" rules={[{required: true, type: "number"}]} >
              <InputNumber size='large' placeholder='20' className='!w-full' />
            </Form.Item>
          </div>

          <Form.Item label="Description" rules={[{required: true}]} name="description">
            <Input.TextArea rows={5} placeholder='Description' />
          </Form.Item>

          {
            !editId && 
            <Form.Item name="image" rules={[{required: true}]}>
              <Upload fileList={[]}>
                <Button size="large" icon={<UploadOutlined />}>Upload a product image</Button>
              </Upload>
            </Form.Item>
          }

          <Form.Item>
            {
              editId ? 
              <Button htmlType='submit' size='large' type='primary' icon={<SaveOutlined />} danger>Save Changes</Button>
              :
              <Button htmlType='submit' size='large' type='primary' icon={<ArrowRightOutlined />}>Add now</Button>
            }
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Products