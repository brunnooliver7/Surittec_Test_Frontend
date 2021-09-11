/* eslint-disable no-alert */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Card = () => {
  const [clientesList, setState] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const password = localStorage.getItem('password');
    axios({
      method: 'get',
      url: 'http://localhost:8080/clientes',
      auth: {
        username: user,
        password,
      },
    })
      .then((response) => {
        setState(response.data);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  function deleteCliente(id) {
    const adminAuthenticated = localStorage.getItem('adminAuthenticated');

    if (adminAuthenticated === 'false') {
      window.alert('Você não está autorizado a deletar clientes');
    } else if (window.confirm('Tem certeza que deseja deletar este cliente?')) {
      const url = `http://localhost:8080/clientes/${id}`;
      const user = localStorage.getItem('user');
      const password = localStorage.getItem('password');

      axios({
        method: 'delete',
        url,
        auth: {
          username: user,
          password,
        },
      });
    }
    window.location.reload();
  }

  const clienteImg = () => {
    let link = 'https://randomuser.me/api/portraits/men/';
    const min = 0;
    const max = 99;
    const random = Math.floor(Math.random() * (+max - +min)) + +min;
    link = link.concat(random);
    link = link.concat('.jpg');
    return link;
  };
  const renderEnderecos = (enderecos) => {
    const itens = [];
    for (let i = 0; i < enderecos.length; i += 1) {
      itens.push(
        <div className="cliente-endereco-itens" key={i}>
          <div className="title-2">
            Endereço
            {' '}
            {i + 1}
          </div>
          <hr className="underline-title-2" />
          <div className="text">
            CEP:
            {' '}
            {enderecos[i].cep}
          </div>
          <div className="text">
            Logradouro:
            {' '}
            {enderecos[i].logradouro}
          </div>
          <div className="text">
            Bairro:
            {' '}
            {enderecos[i].bairro}
          </div>
          <div className="text">
            Cidade:
            {' '}
            {enderecos[i].cidade}
          </div>
          <div className="text">
            UF:
            {' '}
            {enderecos[i].uf}
          </div>
          <div className="text">
            Complemento:
            {' '}
            {enderecos[i].complemento}
          </div>
        </div>,
      );
    }
    return (<div>{itens}</div>);
  };
  const renderTelefones = (telefones) => {
    const itens = [];
    for (let i = 0; i < telefones.length; i += 1) {
      itens.push(
        <div className="cliente-telefone-itens" key={i}>
          <div className="title-2">
            Telefone
            {' '}
            {i + 1}
          </div>
          <hr className="underline-title-2" />
          <div>{telefones[i].tipo}</div>
          <div>{telefones[i].numero}</div>
        </div>,
      );
    }
    return (<div>{itens}</div>);
  };
  const renderEmails = (emails) => {
    const itens = [];
    for (let i = 0; i < emails.length; i += 1) {
      itens.push(
        <div className="cliente-email-itens" key={i}>
          <div className="title-2">
            Email
            {' '}
            {i + 1}
          </div>
          <hr className="underline-title-2" />
          <div>{emails[i].email}</div>
        </div>,
      );
    }
    return (<div>{itens}</div>);
  };

  return (
    <div>
      {clientesList.map((cliente) => (
        <div key={cliente.id} className="card-cliente">
          <div className="container-1">
            <div className="container-1-left">
              <img src={clienteImg()} className="card-img-cliente" alt="img" />
            </div>
            <div className="container-1-right">
              <div className="title-1">Informações Pessoais</div>
              <div className="cliente-nome">
                <div className="title-2">Nome</div>
                <hr className="underline-title-2" />
                {cliente.nome}
              </div>
              <div className="cliente-cpf">
                <div className="title-2">CPF</div>
                <hr className="underline-title-2" />
                {cliente.cpf}
              </div>
            </div>
          </div>
          <hr className="divisor" />
          <div className="container-2">
            <div className="enderecos-title title-1">Endereços</div>
            <div className="cliente-endereco">{renderEnderecos(cliente.endereco)}</div>
          </div>
          <hr className="divisor" />
          <div className="container-3">
            <div className="telefones-title title-1">Telefones</div>
            <div className="cliente-telefone">{renderTelefones(cliente.telefone)}</div>
          </div>
          <hr className="divisor" />
          <div className="container-4">
            <div className="emails-title title-1">Emails</div>
            <div className="cliente-email">{renderEmails(cliente.email)}</div>
          </div>
          <hr className="divisor" />
          <div className="container-5">
            <Link className="btn btn-warning btn-editar" to={`/edit/${cliente.id}`}>Editar</Link>
            <button type="button" className="btn btn-danger btn-deletar" onClick={() => deleteCliente(cliente.id)}>Deletar</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
