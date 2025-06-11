import React, { useEffect, useState } from "react";
import http from "../../utils/http";
import { Button, Form, Input, InputNumber, message, Select } from "antd";
import { HttpStatusCode } from "axios";

export default function FormProductManager({
  onHiddenForm,
  onLoadProduct,
  productId,
}) {
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();

  // Lấy được danh sách danh mục và render ra ngoài giao diện
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await http.get("admin/categories");

        //   Cập nhật state categories
        if (response.data) {
          setCategories(response.data.content);
        }
      } catch (error) {
        const statusCode = error?.response?.status;

        switch (statusCode) {
          case 401:
            alert("Bạn chưa đăng nhập");
            return;

          case 403:
            alert("Bạn không có quyền truy cập vào tài nguyên này");
            return;

          default:
            alert("Đã có lỗi xảy ra. Vui lòng đăng nhập lại");
            return;
        }
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Gọi API lấy thông tin chi tiết sản phẩm
    const getProductDetail = async () => {
      try {
        const response = await http.get(`admin/products/${productId}`);

        // Fill dữ liệu vào trong Form
        form.setFieldsValue({
          name: response.data.name,
          price: response.data.price,
          image: response.data.image,
          quantity: response.data.quantity,
          categoryId: response.data.category.id,
        });
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    getProductDetail();
  }, [productId, form]);

  const onFinish = async (productData) => {
    try {
      let response;
      // Nếu có productId thì hiểu là cập nhật dữ liệu, còn lại là thêm
      if (productId) {
        // Cập nhật dữ liệu
        response = await http.put(`admin/products/${productId}`, productData);
      } else {
        // Thêm mới dữ liệu
        response = await http.post("admin/products", productData);
      }

      // Kiểm tra kết quả trả về
      if (
        response.status === HttpStatusCode.Created ||
        response.status === HttpStatusCode.Ok
      ) {
        // Hiển thị thông báo thành công
        message.success(
          `${productId ? "Cập nhật " : "Thêm mới"} sản phẩm thành công`
        );

        // Load lại dữ liệu
        onLoadProduct();

        // Đóng form thêm mới
        onHiddenForm();
      }
    } catch (error) {
      const statusCode = error?.response?.status;

      if (statusCode === 400) {
        message.error(error?.response?.data?.name);
      }
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      form={form}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item
        rules={[
          {
            required: true,
            message: "Tên sản phẩm không được để trống",
          },
        ]}
        label="Tên sản phẩm"
        name="name"
      >
        <Input />
      </Form.Item>

      <Form.Item
        rules={[
          {
            required: true,
            message: "Hình ảnh không được để trống",
          },
        ]}
        label="Hình ảnh"
        name="image"
      >
        <Input />
      </Form.Item>

      <Form.Item
        rules={[
          {
            required: true,
            message: "Giá không được để trống",
          },
        ]}
        label="Giá"
        name="price"
      >
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        rules={[
          {
            required: true,
            message: "Số lượng không được để trống",
          },
        ]}
        label="Số lượng"
        name="quantity"
      >
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        rules={[
          {
            required: true,
            message: "Danh mục không được để trống",
          },
        ]}
        label="Danh mục"
        name="categoryId"
      >
        <Select
          showSearch
          optionFilterProp="label"
          allowClear
          placeholder="Chọn tên danh mục"
          style={{ width: "100%" }}
          options={categories.map((category) => {
            return {
              value: category.id,
              label: category.name,
            };
          })}
        />
      </Form.Item>

      <Form.Item label={null}>
        <div className="flex justify-end gap-2">
          <Button onClick={onHiddenForm} htmlType="button">
            Hủy
          </Button>
          <Button type="primary" htmlType="submit">
            {productId ? "Lưu" : "Thêm"}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}
