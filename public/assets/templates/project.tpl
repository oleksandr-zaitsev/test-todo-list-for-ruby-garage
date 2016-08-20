<div class="col-sm-offset-2 col-sm-8">
    <div class="panel panel-primary">
        <div class="panel-heading">
            <div class="row">
                <div class="col-sm-10">
                    <span  class="project-name-span"><b><%=name%></b></span>
                    <input type="text" class="hidden form-control project-name-input" maxlength="90" value="<%=name%>" />
                </div>
                <div class="col-sm-2 text-right">
                    <span class="edit-project cursor-pointer glyphicon glyphicon-pencil"></span>
                    &nbsp;&nbsp;
                    <span class="delete-project cursor-pointer glyphicon glyphicon-trash"></span>
                </div>
            </div>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-sm-10">
                    <input type="text" class="form-control task-content" maxlength="256" placeholder="Start typing hear to create a task..." />
                </div>
                <div class="col-sm-2">
                    <button class="btn btn-success form-control add-task">
                        <span class="glyphicon glyphicon-plus"></span>&nbsp;
                        Add Task
                    </button>
                </div>
            </div>
            <div class="tasks-container"></div>
        </div>
    </div>
</div>