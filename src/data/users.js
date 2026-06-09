const users = [
  {
    id: "alice",
    username: "alice",
    password: "alice123",
    displayName: "Alice Demo",
    role: "Analista de Seguranca",
    privateData: {
      reportTitle: "Relatorio interno ficticio",
      labAccount: "LAB-ALICE-001",
      note: "Checklist de sessao vulneravel pronto para demonstracao."
    }
  },
  {
    id: "bruno",
    username: "bruno",
    password: "bruno123",
    displayName: "Bruno Demo",
    role: "Operador do Laboratorio",
    privateData: {
      reportTitle: "Relatorio interno ficticio",
      labAccount: "LAB-BRUNO-002",
      note: "Dados privados ficticios para validar acesso autenticado."
    }
  }
];

function findUserByCredentials(username, password) {
  return users.find((user) => user.username === username && user.password === password) || null;
}

function findUserById(id) {
  return users.find((user) => user.id === id) || null;
}

module.exports = {
  users,
  findUserByCredentials,
  findUserById
};
