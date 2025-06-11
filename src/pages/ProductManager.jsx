import { Button, Image, message, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import FormProductManager from "../components/product/FormProductManager";
import { formatMoney } from "../utils/formatData";
import { deleteProductById, getAllProduct } from "../apis/product.api";
import { HttpStatusCode } from "axios";

export default function ProductManager() {
  const [isShowForm, setIsShowForm] = useState(false); // State quản lý trạng thái mở/đóng form
  const [products, setProducts] = useState([]);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [productId, setProductId] = useState(null);

  const fetchProduct = async () => {
    try {
      const response = await getAllProduct();

      setProducts(response.data.content);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // Hàm mở form
  const handleShowForm = () => {
    setIsShowForm(true);
  };

  // Hàm đóng form
  const handleHiddenForm = () => {
    setIsShowForm(false);

    // Reset lại productId
    setProductId(null);
  };

  // Hàm mở modal xác nhận xóa
  const handleShowModalDelete = (id) => {
    // Cập nhật lại id
    setProductId(id);

    setIsShowModalDelete(true);
  };

  // Hàm đóng modal xác nhận xóa
  const handleHiddenModalDelete = () => {
    setIsShowModalDelete(false);

    // Reset lại productId vừa xóa
    setProductId(null);
  };

  // Hàm xóa sản phẩm
  const handleDeleteProduct = async () => {
    try {
      const response = await deleteProductById(productId);

      if (response.status === HttpStatusCode.Ok) {
        // Hiển thị thông báo thành công
        message.success(response.data);

        // Đóng modal xác nhận xóa
        handleHiddenModalDelete();

        // Load lại dữ liệu
        fetchProduct();
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // Hàm mở modal cập nhật dữ liệu
  const handleShowModalUpdate = (id) => {
    // Cập nhật lại state mở modal
    setIsShowForm(true);

    // Cập nhật lại productId
    setProductId(id);
  };

  const columns = [
    {
      width: 100,
      title: "Hình ảnh",
      dataIndex: "image",
      render: (image) => <Image src={image} height={40} width={50} />,
    },
    {
      width: 300,
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      width: 200,
      title: "Giá",
      dataIndex: "price",
      render: (price) => (
        <div className="font-semibold">{formatMoney(price)}</div>
      ),
    },
    {
      width: 150,
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      width: 200,
      title: "Danh mục",
      dataIndex: ["category", "name"],
    },
    {
      width: 200,
      title: "Chức năng",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button onClick={() => handleShowModalUpdate(record.id)}>Sửa</Button>
          <Button onClick={() => handleShowModalDelete(record.id)}>Xóa</Button>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* Modal form thêm mới / cập nhật sản phẩm */}
      <Modal
        footer={false}
        onCancel={handleHiddenForm}
        title={`${productId ? "Cập nhật" : "Thêm mới"} sản phẩm`}
        open={isShowForm}
        maskClosable={false}
        destroyOnHidden={true}
      >
        <FormProductManager
          productId={productId}
          onHiddenForm={handleHiddenForm}
          onLoadProduct={fetchProduct}
        />
      </Modal>

      {/* Modal xác nhận xóa */}
      <Modal
        onOk={handleDeleteProduct}
        onCancel={handleHiddenModalDelete}
        cancelText="Hủy"
        okText="Xóa"
        title="Xác nhận xóa"
        open={isShowModalDelete}
      >
        <p>Bạn có chắc chắn muốn xóa sản phẩm này không?</p>
      </Modal>

      <div className="m-[50px]">
        <div className="flex items-center justify-between mb-3">
          <h3>Sản phẩm</h3>
          <Button onClick={handleShowForm}>Thêm mới sản phẩm</Button>
        </div>

        {/* Danh sách sản phẩm */}
        <div>
          <Table columns={columns} dataSource={products} rowKey={"id"} />
        </div>
      </div>
    </>
  );
}
