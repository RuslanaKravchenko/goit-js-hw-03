/* Напиши скрипт управления личным кабинетом интернет банка.
 * Есть объект account в котором необходимо реализовать методы для работы с балансом и историей транзакций.
 * Напиши скрипт управления личным кабинетом интернет банка.
 * Есть объект account в котором необходимо реализовать методы для работы с балансом и историей транзакций.
 */

'use strict';
/*
 * Типов транзацкий всего два.
 * Можно положить либо снять деньги со счета.
 */
const Transaction = {
  DEPOSIT: 'deposit',
  WITHDRAW: 'withdraw',
};
let idCounter = 0;

/*
 * Каждая транзакция это объект со свойствами: id, type и amount
 */

const account = {
  // Текущий баланс счета
  balance: 0,

  // История транзакций
  transactions: [],

  /*
   * Метод создает и возвращает объект транзакции.
   * Принимает сумму и тип транзакции.
   */
  createTransaction(amount, type) {
    const newTransaction = {
      id: idCounter,
      type: type,
      amount: amount,
    };

    idCounter += 1;
    return newTransaction;
  },

  /*
   * Метод отвечающий за добавление суммы к балансу.
   * Принимает сумму танзакции.
   * Вызывает createTransaction для создания объекта транзакции
   * после чего добавляет его в историю транзакций
   */
  deposit(amount) {
    this.balance += amount;
    const depositTransaction = this.createTransaction(
      amount,
      Transaction.DEPOSIT,
    );
    this.transactions.push(depositTransaction);
  },

  /*
   * Метод отвечающий за снятие суммы с баланса.
   * Принимает сумму танзакции.
   * Вызывает createTransaction для создания объекта транзакции
   * после чего добавляет его в историю транзакций.
   *
   * Если amount больше чем текущий баланс, выводи сообщение
   * о том, что снятие такой суммы не возможно, недостаточно средств.
   */
  withdraw(amount) {
    if (amount > this.balance) {
      return console.log(
        'Cнятие такой суммы не возможно, недостаточно средств.',
      );
    }

    this.balance -= amount;
    const withdrawTransaction = this.createTransaction(
      amount,
      Transaction.WITHDRAW,
    );
    this.transactions.push(withdrawTransaction);
  },

  /*
   * Метод возвращает текущий баланс
   */
  getBalance() {
    return this.balance;
  },

  /*
   * Метод ищет и возвращает объект транзации по id
   */
  getTransactionDetails(id) {
    for (const transaction of this.transactions) {
      if (transaction.id === id) {
        return transaction;
      }
    }
  },

  /*
   * Метод возвращает количество средств
   * определенного типа транзакции из всей истории транзакций
   */
  getTransactionTotal(type) {
    let total = 0;

    for (const transaction of this.transactions) {
      if (transaction.type === type) {
        total += transaction.amount;
      }
    }
    return total;
  },
};

account.deposit(500);
console.log(account.transactions);
account.deposit(500);
console.log(account.transactions);
account.deposit(300);
console.log(account.transactions);

console.log(account.getBalance());

account.withdraw(200);
console.table(account.transactions);
console.log(account.getBalance());

console.log(account.getTransactionTotal('deposit'));
console.log(account.getTransactionTotal('withdraw'));

console.log(account.getTransactionDetails(3));
