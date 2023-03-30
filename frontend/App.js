import React, { Component } from "react";
import CustomModal from "./components/CustomModal";
import axios from 'axios';  

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      taskList: []
    };
  }

  // Add componentDidMount() - обязательная функция для axios
  componentDidMount() {
    this.refreshList();
  }

  // Забирает данные от API. Выводит ошибки в консоль.
  refreshList = () => {
    axios   //Axios HTTP requests
      .get("http://127.0.0.1:8000/api/tasks/")
      .then(res => this.setState({ taskList: res.data }))
      .catch(err => console.log(err));
  };

  // Отвечает за то, какой раздел (Incompleted | Completed) выбран в данный момент. 
  // Раздел по умолчанию зависит от значения параметра - viewCompleted.
  // Отрабатывает при загрузке страницы, а также по клику на разделы (Incompleted | Completed)
  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };

  // Отрисовка 2 разделов (Incompleted | Completed). Стиль раздела зависит от того, является ли раздел активным(выбран ли)
  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "sw-btn" : "active"}>
          Incompleted
        </span>

        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : "sw-btn"}>
          Completed
        </span>
      </div>
    );
  };

  // Отрисовка полученных от API задач (tasks). Полный список фильтруется по значению 
  // completed задачи и текущего viewCompleted
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.taskList.filter(
      item => item.completed === viewCompleted
    );
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center custom_bcg"
      >
        <span // Раздел с задачей. Отображается по умолчанию только title. 
              //По клику на title вызывается метод для редактирования в котором (отрабатывает CusnomModal) с последующим PUT-запросом
          onClick={() => this.editItem(item)}
          className={`todo-title m-2 ${this.state.viewCompleted ? "completed-todo" : ""
            }`}
        >
          {item.title}
        </span>
        <span>
          <a
                // Кнопка Delete для удаления задачи. Вызывает функцию handleDelete, 
                // которая отправляет DELETE -запрос к API.
            onClick={() => this.handleDelete(item)}
          ><img src="/images/delete.png" className="del-img"/>
          </a>
        </span>
      </li>
    ));
  };
  // ///////////////////////////////////////////////////////////

  // Переключатель. Открывает/Закрывает форму редактирования-добавления задачи из компонента CustomModal
  toggle = () => {//add this after modal creation
    this.setState({ modal: !this.state.modal });
  };


  // Создает/редактирует элемент - task
  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      // Если метод был вызван из поля редактирования существующего task, тогда метод PUT
      axios
        .put(`http://127.0.0.1:8000/api/tasks/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    // В этом случае метод был вызван по нажатию кнопки Add task - метод POST. Создается новый task.
    axios
      .post("http://127.0.0.1:8000/api/tasks/", item)
      .then(res => this.refreshList());
  };

  // Удаление конкретной задачи (task)
  handleDelete = item => {
    axios
      .delete(`http://127.0.0.1:8000/api/tasks/${item.id}/`)
      .then(res => this.refreshList());
  };


  // Вызывается при создании новой задачи (task) со значениями 
  // по умолчанию их константы item для того, чтобы форма создания всегда очищалась от прошлых значений.
  createItem = () => {
    const item = { title: "", description: "", completed: false, prior: 1 };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  // Вызывается при редактировании
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };


  // -I- Start 
  render() {
    return (
      <main className="content p-3 mb-2 ">
        <h1 className="text-white text-uppercase text-center my-4">Task Manager</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3 custom_bcg">
              <div className="">
                <button onClick={this.createItem} className="btn add-btn">
                  Add task
                    </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush custom_bcg">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <CustomModal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
        <footer className="my-3 mb-2 text-white text-center">
          <p>Alexander Seryakov </p>
          <p>2023 CopyRight &copy;</p>
        </footer>
      </main>
    );
  };
};
export default App;
