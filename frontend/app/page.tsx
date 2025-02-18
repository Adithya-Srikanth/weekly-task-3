"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";

type Expense = {
  id: number;
  title: string;
  cost: number;
  date: string;
};

const page = () => {
  const [income, setIncome] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);
  const [savings, setSavings] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [cost, setCost] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [incomeFormValue, setIncomeFormValue] = useState<number>(0);
  const [expenses, setExpenses] = useState<Array<Expense>>([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/income")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setIncome(parseInt(data.income));
        setSavings(parseInt(data.income) - expense);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/expenses")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          alert("couldn't retrieve expenses");
        }
      })
      .then((data) => {
        setExpenses(data.res);
      })
      .catch((err) => {
        alert("couldn't retrieve expenses");
      });
  }, []);

  useEffect(() => {
    let totalCost = 0;
    if (expenses.length !== 0) {
      expenses.forEach((exp) => {
        totalCost += exp.cost;
      });
    }
    setExpense(totalCost);
    setSavings(income - totalCost);
  }, [expenses]);

  const incomeSubmitHandler = (event: any) => {
    event.preventDefault();
    fetch("http://localhost:8080/api/income", {
      method: "POST",

      body: JSON.stringify({
        income: incomeFormValue,
      }),

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(() => {
        alert("income updated successfully");
        setIncome(incomeFormValue);
        setSavings(incomeFormValue - expense);
      })
      .catch(() => {
        alert("error updating income");
        setIncome(0);
        setSavings(0 - expense);
      });
    setIncomeFormValue(0);
  };

  const incomeChangeHandler = (event: any) => {
    setIncomeFormValue(event.target.value);
  };

  const expenseTitleChangeHandler = (event: any) => {
    setTitle(event.target.value);
  };

  const expenseCostChangeHandler = (event: any) => {
    setCost(event.target.value);
  };

  const expenseDateChangeHandler = (event: any) => {
    setDate(event.target.value);
  };

  const expenseSubmitHandler = (event: any) => {
    event.preventDefault();
    fetch("http://localhost:8080/api/expenses", {
      method: "POST",

      body: JSON.stringify({
        title,
        cost,
        date,
      }),

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("expense created successfully");
        } else {
          alert("couldn't create expense");
        }
      })
      .catch((e) => {
        alert("couldn't create expense");
      });
    setTitle("");
    setCost(0);
    setDate("");
  };

  const viewExpensesHandler = () => {
    fetch("http://localhost:8080/api/expenses")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          alert("couldn't fetch expenses");
        }
      })
      .then((data) => {
        setExpenses(data.res);
        console.log(data.res);
      })
      .catch(() => {
        alert("couldn't fetch expenses");
      });
  };

  const removeElementFromDom = (elemId: string) => {
    const listElem = document.getElementById(elemId);
    listElem!.style.display = "none";
  };
  const deleteExpensehandler = (id: number, cost: number) => {
    fetch(`http://localhost:8080/api/expenses/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          alert("expense deleted successfully");
          setSavings(savings + cost);
          setExpense(expense - cost);
          removeElementFromDom(`list-element-${id}`);
        } else {
          alert("couldn't delete expense");
        }
      })
      .catch(() => {
        alert("couldn't delete expense");
      });
  };
  return (
    <section className={styles.page}>
      <h1 className={styles.pageHeading}>Monthly Expense Manager</h1>
      <form className={styles.incomeForm} onSubmit={incomeSubmitHandler}>
        <label className={styles.formLabel}>Enter Income:</label>
        <input
          type="text"
          className={styles.formInput}
          onChange={incomeChangeHandler}
          value={incomeFormValue}
        />
        <button className={styles.incomeBtn}>ADD</button>
      </form>
      <div className={styles.stats}>
        <h2 className={styles.statsHeading}>Statistics</h2>
        <hr className={styles.statsHr} />
        <p className={styles.stat}>
          Monthly Income: <span> {income}$</span>
        </p>

        <p className={styles.stat}>
          Total Monthly Expenses: <span> {expense}$</span>
        </p>
        <p className={styles.stat}>
          Monthly Savings:<span> {savings}$</span>
        </p>
      </div>
      <form className={styles.form} onSubmit={expenseSubmitHandler}>
        <label className={styles.formLabel}>Enter New Expense:</label>
        <input
          type="text"
          className={styles.formInput}
          onChange={expenseTitleChangeHandler}
          value={title}
        />
        <label className={styles.formLabel}>Enter Cost:</label>
        <input
          type="text"
          className={styles.formInput}
          onChange={expenseCostChangeHandler}
          value={cost}
        />
        <label className={styles.formLabel}>Enter Date:</label>
        <input
          type="date"
          className={styles.formInput}
          onChange={expenseDateChangeHandler}
          value={date}
        />
        <button className={styles.formBtn}>ADD</button>
      </form>
      <div className={styles.expenseList}>
        <h2 className={styles.expenseListHeading}>Expense List:</h2>
        <button
          onClick={viewExpensesHandler}
          className={styles.viewExpensesBtn}
        >
          View New Expenses
        </button>
        <div className={styles.expenseBox}>
          {expenses.length === 0 ? (
            <h1 className={styles.noExpenses}>No Expenses To Display</h1>
          ) : (
            <ul className={styles.expenses}>
              {expenses.map((exp) => {
                return (
                  <li key={exp.id} id={`list-element-${exp.id}`}>
                    <h2>title:{exp.title}</h2>
                    <p>cost:{exp.cost}$</p>
                    <p>date:{exp.date}</p>
                    <button
                      onClick={() => deleteExpensehandler(exp.id, exp.cost)}
                      className={styles.expenseBtn}
                    >
                      Delete
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default page;
