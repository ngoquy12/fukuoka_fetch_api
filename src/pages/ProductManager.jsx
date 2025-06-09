import { Button, Checkbox, Form, Input, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";
import http from "../utils/http";

export default function ProductManager() {
  const [categories, setCategories] = useState([]);
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

  console.log("categories: ", categories);

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item label="Tên sản phẩm" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="Hình ảnh" name="image">
          <Input />
        </Form.Item>

        <Form.Item label="Giá" name="price">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Số lượng" name="quantity">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Danh mục" name="categoryId">
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
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
