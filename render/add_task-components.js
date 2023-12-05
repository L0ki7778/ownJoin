function renderAddTaskSections(){
    return/*html*/`
    <h1 class="title">Add Task</h1>
        <div class="sections">
      <div class="leftSection">
        <p>Title<span class="span">*</span></p>
        <input id="title" type="text" placeholder="Enter a title" required/>

        <p>Description</p>
        <textarea id="description" placeholder="Enter a Description" cols="30" rows="10" required></textarea>

        <p>Assigned to</p>
        <div class="selectContainer">
        <select class="select-box" id="assign" >
          <option value="" style="display: none;">Select contacts to assign</option>

        </select>
        <div class="divIcon"><i><img src="/assets/img/arrow_drop_down.png" alt=""></i></div>
        </div>
      </div>

      <div class="border"></div>

      <div class="rightSection">
        <p>Due date<span class="span">*</span></p>
        <input id="date" type="date" required/>

        <p>Prio</p>
        <div id="prio">
          <div class="prio Urgent">
              <label>
                  <input id="urgent" type="checkbox" value="Urgent" onclick="checkBoxClicked('urgent')">
                  <span>Urgent <img class="prioImgs" src="/assets/img/urgent-priority.png" alt=""></span>
              </label>
          </div>
          <div class="prio Medium">
              <label>
                  <input id="medium" type="checkbox" value="Medium" onclick="checkBoxClicked('medium')">
                  <span>Medium <img class="prioImgs" src="/assets/img/medium-priority.png" alt=""></span>
              </label>
          </div>
          <div class="prio Low">
              <label>
                  <input id="low" type="checkbox" value="Low" onclick="checkBoxClicked('low')">
                  <span>Low <img class="prioImgs" src="/assets/img/low-priority.png" alt=""></span>
              </label>
          </div>
      </div>

        <p>Category<span class="span">*</span></p>
        
        <div class="selectContainer">
          <select  class="select-box" id="category" required>
            <option value="" style="display: none;">Select contacts to assign</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Await Feedback">Await Feedback</option>
            <option value="Done">Done</option>
          </select>
          <div class="divIcon"><i><img src="/assets/img/arrow_drop_down.png" alt=""></i></div>
          </div>
        <p>Subtasks</p>
        <div class="selectContainer">
        <input class="select-box" id="subTask" type="text" placeholder="Add new subtask" />
        <div class="divIcon"><i><img src="/assets/img/board-plus.png" alt=""></i></div>
          </div>
         </div>
      </div>
      <div class="bottomSection">
      <p ><span class="span">*</span>This field is required</p>
      <div>
        <button class="clearButton">Clear <img src="/assets/img/btn-x.png" alt="" /></button>
        <button class="createTaskButton" onclick="addTask()">Create Task <img src="/assets/img/checkbtn-checkmark.png" alt="" /></button>
      </div>
    </div>
    `
}