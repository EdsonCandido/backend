exports.clearCpf = async (cpf = "") => {
  return cpf.replace(/[^\d]/g, "");
};
exports.formatCpf = async (cpf) => {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};
exports.clearCnpj = async (cnpj) => {
  return cnpj.replace(/[^\d]/g, "");
};
exports.formatCnpj = async (cnpj) => {
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1 $2 $3/$4-$5");
};
