<td class="sm-cell">
    <input type="hidden" class="position" value="<%=position%>" />
    <input type="checkbox" class="cursor-pointer completed" <%=(completed ? 'checked="checked"' : '')%> />
</td>
<td class="break-word">
    <%=(completed ? '<strike>' : '')%>
        <span  class="task-content-span"><b><%=content%></b></span>
    <%=(completed ? '</strike>' : '')%>
    <input type="text" class="hidden form-control task-content-input" maxlength="256" value="<%=content%>" />
</td>
<td class="sm-cell">
    <span class="cursor-drag-hand glyphicon glyphicon-resize-vertical"></span>
</td>
<td class="sm-cell">
    <span class="edit-task cursor-pointer glyphicon glyphicon-pencil"></span>
</td>
<td class="sm-cell">
    <span class="destroy-task cursor-pointer glyphicon glyphicon-trash"></span>
</td>