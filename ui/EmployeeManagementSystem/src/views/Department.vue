<template>
    <div>
      <Navigation></Navigation>
      <button type="button" class="btn btn-primary m-2 float-end" data-bs-toggle="modal" data-bs-target="#departmentModal" @click="addClick()">
        Add Department
      </button>
  
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Department Id</th>
            <th>Department Name</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dep in departments" :key="dep.DepartmentId">
            <td>{{ dep.DepartmentId }}</td>
            <td>{{ dep.DepartmentName }}</td>
            <td>
              <button type="button" class="btn btn-light mr-1" data-bs-toggle="modal" data-bs-target="#departmentModal" @click="editClick(dep)">
                Edit
              </button>
              <button type="button" @click="deleteClick(dep.DepartmentId)" class="btn btn-light mr-1">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div class="modal fade" id="departmentModal" tabindex="-1" aria-labelledby="departmentModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="departmentModalLabel">{{ modalTitle }}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="input-group mb-3">
                <span class="input-group-text">Department Name</span>
                <input type="text" class="form-control" v-model="DepartmentName">
              </div>
              <button type="button" @click="createClick()" v-if="DepartmentId == 0" class="btn btn-primary">Create</button>
              <button type="button" @click="updateClick()" v-else class="btn btn-primary">Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Navigation from '@/components/Navigation.vue';
import axios from '../../axios';
  import variables from '../../variables'; 

  
  export default {
    name: 'Department',
    data() {
      return {
        departments: [],
        modalTitle: "",
        DepartmentName: "",
        DepartmentId: 0
      }
    },
    components:{
      Navigation
    },
    methods: {
      refreshData() {
        axios.get(variables.API_URL + "department")
          .then((response) => {
            this.departments = response.data;
          })     .catch(error => {
        console.error('Error fetching data:', error);
      });
      },
      addClick() {
        this.modalTitle = "Add Department";
        this.DepartmentId = 0;
        this.DepartmentName = "";
      },
      editClick(dep) {
        this.modalTitle = "Edit Department";
        this.DepartmentId = dep.DepartmentId;
        this.DepartmentName = dep.DepartmentName;
      },
      createClick() {
        axios.post(variables.API_URL + "department", {
            DepartmentName: this.DepartmentName
          })
          .then((response) => {
            this.refreshData();
            alert(response.data);
          }).catch(error => {
        console.error('Error fetching data:', error);
      });
      },
      updateClick() {
        axios.put(variables.API_URL + "department", {
            DepartmentId: this.DepartmentId,
            DepartmentName: this.DepartmentName
          })
          .then((response) => {
            this.refreshData();
            alert(response.data);
          }).catch(error => {
        console.error('Error fetching data:', error);
      });
      },
      deleteClick(id) {
        if (!confirm("Are you sure?")) {
          return;
        }
        axios.delete(variables.API_URL + "department/" + id)
          .then((response) => {
            this.refreshData();
            alert(response.data);
          }).catch(error => {
        console.error('Error fetching data:', error);
      });
      }
    },
    mounted() {
      this.refreshData();
    }
  }
  </script>
  