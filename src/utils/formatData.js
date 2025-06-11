/**
 * @description Hàm định dạng tiền tệ
 * @param {*} money Chuỗi tiền tệ cần format
 * @param {*} format Định dạng cần format (mặc định là VND)
 * @returns Chuỗi tiền tệ đã được format
 * @author Ngọ Văn Quý (11/06/2025)
 * @modified
 */
export const formatMoney = (money, format = "VND") => {
  return money.toLocaleString("it-IT", {
    style: "currency",
    currency: format,
  });
};
