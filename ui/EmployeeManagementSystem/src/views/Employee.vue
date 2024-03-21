<template>
    <div>
      <button type="button"
              class="btn btn-primary m-2 float-end"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              @click="addClick()">
        Add Employee
      </button>
  
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee Name</th>
            <th>Department</th>
            <th>DOJ</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="emp in employees" :key="emp.EmployeeId">
            <td>{{ emp.EmployeeId }}</td>
            <td>{{ emp.EmployeeName }}</td>
            <td>{{ emp.Department }}</td>
            <td>{{ emp.DateOfJoining }}</td>
            <td>
              <button type="button"
                      class="btn btn-light mr-1"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      @click="editClick(emp)">
                Edit
              </button>
              <button type="button" @click="deleteClick(emp.EmployeeId)"
                      class="btn btn-light mr-1">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div class="modal fade" id="exampleModal" tabindex="-1"
           aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">{{ modalTitle }}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"
                      aria-label="Close"></button>
            </div>
  
            <div class="modal-body">
              <!-- Modal content here -->
              <div class="modal-body">
                <div class="d-flex flex-row bd-highlight mb-3">
                  <div class="p-2 w-50 bd-highlight">
                    <div class="input-group mb-3">
                      <span class="input-group-text">Name</span>
                      <input type="text" class="form-control" v-model="EmployeeName">
                    </div>
  
                    <div class="input-group mb-3">
                      <span class="input-group-text">Department</span>
                      <select class="form-select" v-model="Department">
                        <option v-for="dep in departments" :key="dep.DepartmentId">{{ dep.DepartmentName }}</option>
                      </select>
                    </div>
  
                    <div class="input-group mb-3">
                      <span class="input-group-text">DOJ</span>
                      <input type="date" class="form-control" v-model="DateOfJoining">
                    </div>
                  </div>
  
                  <div class="p-2 w-50 bd-highlight">
                    <img width="300px" height="300px" :src="PhotoPath + PhotoFileName"/>
                    <input class="m-2" type="file" @change="imageUpload">
                  </div>
                </div>
  
                <button type="button" @click="createClick()" v-if="EmployeeId == 0" class="btn btn-primary">Create</button>
                <button type="button" @click="updateClick()" v-else class="btn btn-primary">Update</button>
              </div>
  
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import variables from '../../variables'; // Import your variables file
  
  export default {
    data() {
      return {
        departments: [],
        employees: [],
        modalTitle: "",
        EmployeeId: 0,
        EmployeeName: "",
        Department: "",
        DateOfJoining: "",
        PhotoFileName: "anonymous.png",
        PhotoPath: variables.PHOTO_URL
      }
    },
    methods: {
      refreshData() {
        axios.get(variables.API_URL + "employee")
          .then((response) => {
            this.employees = response.data;
          });
  
        axios.get(variables.API_URL + "department")
          .then((response) => {
            this.departments = response.data;
          });
      },
      addClick() {
        this.modalTitle = "Add Employee";
        this.EmployeeId = 0;
        this.EmployeeName = "";
        this.Department = "";
        this.DateOfJoining = "";
        this.PhotoFileName = "anonymous.png";
      },
      editClick(emp) {
        this.modalTitle = "Edit Employee";
        this.EmployeeId = emp.EmployeeId;
        this.EmployeeName = emp.EmployeeName;
        this.Department = emp.Department;
        this.DateOfJoining = emp.DateOfJoining;
        this.PhotoFileName = emp.PhotoFileName;
      },
      createClick() {
        axios.post(variables.API_URL + "employee", {
            EmployeeName: this.EmployeeName,
            Department: this.Department,
            DateOfJoining: this.DateOfJoining,
            PhotoFileName: this.PhotoFileName
          })
          .then((response) => {
            this.refreshData();
            alert(response.data);
          });
      },
      updateClick() {
        axios.put(variables.API_URL + "employee", {
            EmployeeId: this.EmployeeId,
            EmployeeName: this.EmployeeName,
            Department: this.Department,
            DateOfJoining: this.DateOfJoining,
            PhotoFileName: this.PhotoFileName
          })
          .then((response) => {
            this.refreshData();
            alert(response.data);
          });
      },
      deleteClick(id) {
        if (!confirm("Are you sure?")) {
          return;
        }
        axios.delete(variables.API_URL + "employee/" + id)
          .then((response) => {
            this.refreshData();
            alert(response.data);
          });
  
      },
      imageUpload(event) {
        let formData = new FormData();
        formData.append('file', event.target.files[0]);
        axios.post(
            variables.API_URL + "employee/savefile",
            formData)
          .then((response) => {
            this.PhotoFileName = response.data;
          });
      }
    },
    mounted() {
      this.refreshData();
    }
  }
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  