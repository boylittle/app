var current_uid=window.localStorage.getItem('Tasks:index');
var Tasks = {index:current_uid==null?0:current_uid};
/**jQuery(document).ready(function(){
  $("#b01").click(function(){
  var htmlobj=$.ajax({url:"http://files.cnblogs.com/files/developer-ios/loader.xml",async:false});
  $("#myDiv").html(htmlobj.responseText);
  });
});**/
function loadFrom(){
	var keys=getStore();
	if(keys.length<1){
		var retData=$.ajax({url:"https://raw.githubusercontent.com/boylittle/app/master/app/js/config/data.js",async:false});
		
		if(retData&&retData.responseText){
			var retText=retData.responseText;
			var json=JSON.parse(retText);
			
			
			for(var key in json) { 
		  //  console.log("属性：" + key + ",值："+ json[key]);  
		  
				if(/task:\d+/.test(key)){  
				window.localStorage.setItem(key, json[key]);
				}else if(/Tasks:index/.test(key)){
				 window.localStorage.setItem(key, json[key]);
				Tasks.index=json[key];
				}
		  
			}  
			
			
		} 
					
				 
}
	
}
function loadFromLocal(retText,v){
	 
			var json=JSON.parse(retText); 
			
			for(var key in json) { 
		 
				if(/task:\d+/.test(key)){  
				window.localStorage.setItem(key, json[key]);
				}else if(/Tasks:index/.test(key)){
				 window.localStorage.setItem(key, json[key]);
				Tasks.index=json[key];
				}
		  
			}   
					
				 
}

 function saveBatch(retText){
	 if(!retText){
		 return;
	 }
	 var json=JSON.parse(retText); 
			
			for(var key in json) { 
		 
				if(/task:\d+/.test(key)){ 
					++Tasks.index;

				var obj=json[key];
				obj=JSON.parse(obj); 
				if(obj.uid){
					obj.uid=Tasks.index;
				}else{
					continue;
				}
				
				window.localStorage.setItem("task:"+Tasks.index, JSON.stringify(obj));
				
				}else if(/Tasks:index/.test(key)){
				 ///
				}
		  
			}   
	 
	 window.localStorage.setItem('Tasks:index', Tasks.index);
	 
	 
	/**var json=JSON.parse(retText); 
			
			for(var key in json) { 
		 
				if(/task:\d+/.test(key)){  
				window.localStorage.setItem(key, json[key]);
				}else if(/Tasks:index/.test(key)){
				 window.localStorage.setItem(key, json[key]);
				Tasks.index=json[key];
				}
		  
			}   
	 window.localStorage.setItem("task:"+ myId, JSON.stringify(e.context.newValues));
	**/
}
 function cleanStore(){
	 var array=[];
	 	for(var i=0,len=window.localStorage.length;i<len;i++){
					key=window.localStorage.key(i);
					if(/task:\d+/.test(key)){
						array.push(key);
					}else if(/Tasks:index/.test(key)){
					array.push(key);
					} 
	 
		}
		
		for(var key in array){
			window.localStorage.removeItem(array[key]);
		} 
		Tasks.index=0;
 }
 
 function getStore(){
	 var array=[];
	 	for(var i=0,len=window.localStorage.length;i<len;i++){
					key=window.localStorage.key(i);
					if(/task:\d+/.test(key)){
						array.push(key);
					}else if(/Tasks:index/.test(key)){
					array.push(key);
					} 
	 
		}
		
		return array;
		
 }
	
Ext.Loader.setConfig({
    enabled: true
});
Ext.Loader.setPath('Ext.ux', 'app/extjs/examples/ux');

Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*',
    'Ext.form.*',
    'Ext.ux.CheckColumn'
]);

Ext.onReady(function(){
    // Define our data model
    Ext.define('Employee', {
        extend: 'Ext.data.Model',
        fields: [
			'uid',
            'title',
            'fromUrl',
			'toUrl',
            { name: 'active', type: 'bool' },
			 { name: 'pattern', type: 'bool' },
			  { name: 'include', type: 'bool' },
				{name:'equal',type:'bool'},
			  { name: 'inject', type: 'bool' },
			   { name: 'ignore', type: 'bool' },
			   { name: 'isdisk', type: 'bool' },
			   { name: 'readyBefore', type: 'bool' }
        ]
    });
 
    // Generate mock employee data
    var data = []; 
	 
			 
				var key;
				for(var i=0,len=window.localStorage.length;i<len;i++){
					key=window.localStorage.key(i);
					if(/task:\d+/.test(key)){
						data.push(JSON.parse(window.localStorage.getItem(key)));
					}
				} 
	
 
    // create the Data Store
    var store = Ext.create('Ext.data.Store', {
        // destroy the store if the grid is destroyed
        autoDestroy: true,
        model: 'Employee',
        proxy: {
            type: 'memory'
        },
        data: data,
        sorters: [{
            property: 'start',
            direction: 'ASC'
        }]
    });

    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
       /** clicksToMoveEditor: 1,
        autoCancel: false**/
		 pluginId:'rowEditing',
            saveBtnText: '保存', 
            cancelBtnText: "取消", 
            autoCancel: false, 
            clicksToEdit:2,   //双击进行修改  1-单击   2-双击    0-可取消双击/单击事件
		viewConfig:{forceFit:true,autoFill:true,markDirty:false} 
    });
	 

    // create the grid and specify what field you want
    // to use for the editor at each column.
    var grid = Ext.create('Ext.grid.Panel', {
        store: store,
        columns: [{
			 
            header: '标识列',
            dataIndex: 'uid',
            width: 40,
            editor: { 
                // defaults to textfield if no xtype is supplied
                allowBlank: false
            }
        },{
            header: '标题',
            dataIndex: 'title',
            width: 100,
            editor: {
                // defaults to textfield if no xtype is supplied
                allowBlank: false
            }
        }, {
			
            header: '原url',
            dataIndex: 'fromUrl',
            flex: 3,
            editor: {
				xtype: 'textarea',
                allowBlank: false
            }
        }, {
			
            header: '目标url',
            dataIndex: 'toUrl',
            flex: 1,
            editor: {
				xtype: 'textarea',
                allowBlank: false
            }
        }, {
			xtype: 'checkcolumn',
            header: '启用',
            dataIndex: 'active',
            width: 60,
            editor: {
                xtype: 'checkbox',
                cls: 'x-grid-checkheader-editor'
            }
        }, {
			xtype: 'checkcolumn',
            header: '正则匹配',
            dataIndex: 'pattern',
            width: 60,
            editor: {
                xtype: 'checkbox',
                cls: 'x-grid-checkheader-editor'
            }
        }, {
			xtype: 'checkcolumn',
            header: '包含',
            dataIndex: 'include',
            width: 60,
            editor: {
                xtype: 'checkbox',
                cls: 'x-grid-checkheader-editor'
            }
        }, {
			xtype: 'checkcolumn',
            header: '完全一致',
            dataIndex: 'equal',
            width: 60,
            editor: {
                xtype: 'checkbox',
                cls: 'x-grid-checkheader-editor'
            }
        }, {
			xtype: 'checkcolumn',
            header: '注入',
            dataIndex: 'inject',
            width: 60,
            editor: {
                xtype: 'checkbox',
                cls: 'x-grid-checkheader-editor'
            }
        }, {
			xtype: 'checkcolumn',
            header: '忽略',
            dataIndex: 'ignore',
            width: 60,
            editor: {
                xtype: 'checkbox',
                cls: 'x-grid-checkheader-editor'
            }
        }, {
			xtype: 'checkcolumn',
            header: '硬盘',
            dataIndex: 'isdisk',
            width: 60,
            editor: {
                xtype: 'checkbox',
                cls: 'x-grid-checkheader-editor'
            }
        },{
			xtype: 'checkcolumn',
            header: 'ready前执行js',
            dataIndex: 'readyBefore',
            width: 60,
            editor: {
                xtype: 'checkbox',
                cls: 'x-grid-checkheader-editor'
            }
        }],
        renderTo: 'editor-grid',
        width: 1000,
        height: 550,
        title: 'URL MAPPING',
        frame: true,
        tbar: [{
            text: '添加一项',
            iconCls: 'employee-add',
            handler : function() {
                rowEditing.cancelEdit();
var newData={
					uid:++Tasks.index,
                    title: '标题',
                    fromUrl: 'http://url.com',
					toUrl: 'localhost',
                    active: true,
					pattern:false,
					include:false,
					equal:false,
					inject:false,
					isdisk:false,
					ignore:false,
					readyBefore:false
					
                };
                // Create a model instance
                var r = Ext.create('Employee', newData);
				
 window.localStorage.setItem('Tasks:index', Tasks.index);
		 
	 window.localStorage.setItem("task:"+ Tasks.index, JSON.stringify(newData));
                store.insert(0, r);
                rowEditing.startEdit(0, 1);
            }
        }, {
            itemId: 'loadEmployee',
            text: '网络加载',
            iconCls: 'employee-add',
            handler: function() {
				
				Ext.Msg.confirm("操作提示","请手动清空本地数据（清空前，可以导出备份）,然后再下载数据。",function(btn){  
			//	grid.getSelectionModel().deselectAll(true);  
				if(btn=='yes'){  
				loadFrom();
				 //store.reload(); 	//console.log(store.modified);
				location.reload();				
				}  
			});   
				
				
				
			 ////////////////////////////////////////////////

            },
            disabled: false
        }, {
            itemId: 'removeEmployee',
            text: '删除',
            iconCls: 'employee-remove',
            handler: function() {
				
                var sm = grid.getSelectionModel();
                rowEditing.cancelEdit();
			var item=	sm.getSelection();
			 for(var i=0;i<item.length;i++){
				 var myUid=item[i].data["uid"];
				window.localStorage.removeItem("task:"+ myUid);
				 
			 }
					
				 
				 
				
                store.remove(item);
                if (store.getCount() > 0) {
                    sm.select(0);
                }
            },
            disabled: true
        },{
            itemId: 'selectAll',
            text: '全选',
            iconCls: 'employee-remove',
            handler: function() {
			 
               var array = Ext.getCmp('active').items;  
                        array.each(function(item){  
//                          alert(item.getValue());  
                            if(item.getValue()==true){  
                                item.setValue(false);  
                            }else{  
                                item.setValue(true);  
                            }  
                        });  
				 
				 
            },
            disabled: false
        },{
            itemId: 'editTargetUrl',
            text: 'edit目标url',
            iconCls: 'employee-remove',
            handler: function() {
				
                var sm = grid.getSelectionModel();
                rowEditing.cancelEdit();
			var item=	sm.getSelection();
			if(item.length==1){
				 var myUid=item[0].data["uid"]; 
				 var myFUrl=item[0].data["fromUrl"]; 
				  var myTUrl=item[0].data["toUrl"]; 
				
			var my_windows=Ext.create('Ext.window.Window',{
						id:'myWindows',
                          title:'grid',
                          width:1000,
                          height:750,
                          modal:true,
                          plain:true,
						  constrainHeader:true,
						  layout:"vbox", //这个属性要添加，没有就不能正常添加子组件了  
						   items: [ 
                   
                        { xtype: "textarea",id:"fromUrl", style:"white-space:nowrap; overflow:scroll;" ,name: "fromUrl", cols:200,width:980,height:30,fieldLabel: "原Url", allowBlank: false,value:myFUrl },
						  { xtype: "hidden",id:"uid", name: "uid", width:50,fieldLabel: "原Url", allowBlank: false ,value:myUid},
                        { xtype: "textarea",id:"toUrl", name: "toUrl", width:980,cols:200, height:650, fieldLabel: "目标url",allowBlank: false,value:myTUrl}
                  
                
       
    ],
    buttons: [
        { xtype: "button", text: "确定", handler: function () { 
		var obj=window.localStorage.getItem("task:"+ myUid);
		if(obj){
			obj=JSON.parse(obj);
			
			item[0].data["fromUrl"]=obj.fromUrl=Ext.getCmp('fromUrl').value;
			item[0].data["toUrl"]=obj.toUrl=Ext.getCmp('toUrl').value;
			
	 window.localStorage.setItem("task:"+ myUid, JSON.stringify(obj));
	// store.reload(); 	//console.log(store.modified);
	location.reload();
		
		}
		
		this.up("window").close(); 
		
		} },
        { xtype: "button", text: "取消", handler: function () {
			
			this.up("window").close();

			} }
    ]
			 	  
						  
						  
						  
                      }).show();
				
				
				
				
			}else{
				alert("只能选择项");
			}
			 
					
				 
				 
				
                 
                if (store.getCount() > 0) {
                    sm.select(0);
                }
            },
            disabled: false
        }, {
            itemId: 'clearEmployee',
            text: '清空',
            iconCls: 'employee-remove',
            handler: function() {
				 
		 	var gridStore = grid.getStore();  
			if(gridStore.getCount()==0){
				//window.localStorage.clear();
				cleanStore();
				Tasks.index=0;
				return;  
			}  
			Ext.Msg.confirm("操作提示","确定要清空所有数据吗?",function(btn){  
				grid.getSelectionModel().deselectAll(true);  
				if(btn=='yes'){  
					grid.getStore().removeAll();   
					//window.localStorage.clear();
					cleanStore();
					Tasks.index=0;					
				}  
			});   


            },
            disabled: false
        }, {
            itemId: 'exportEmployee',
            text: '导出Config',
            iconCls: 'employee-remove',
            handler: function() {
				var jsonText="{}";
				  var sm = grid.getSelectionModel();
                rowEditing.cancelEdit();
				var item=sm.getSelection();
				
				
				/////
			if(item.length==1){
				 var myUid=item[0].data["uid"]; 
				var selectOne=  window.localStorage.getItem("task:"+ myUid); 
				 if(selectOne){
					var key=("task:"+ myUid);
					var objs={};
					objs["task:"+ myUid]=selectOne;
					jsonText= JSON.stringify(objs);
				 }else{
					  alert("已经丢失");
				 }
				
			}else{
				jsonText= JSON.stringify(window.localStorage);
				
			}
				 
			
			
						var my_windows=Ext.create('Ext.window.Window',{
						id:'myWindows',
                          title:'grid',
                          width:1000,
                          height:500,
                          modal:true,
                          plain:true,
						  layout:"vbox", //这个属性要添加，没有就不能正常添加子组件了  
						   items: [ 
                   
                        { xtype: "textarea",id:"exportContent", style:"white-space:nowrap; overflow:scroll;" , cols:200,width:990,height:350,fieldLabel: "", allowBlank: false,value:jsonText }
                  
                
       
    ],
    buttons: [
        { xtype: "button", text: "copy", handler: function () { 
		 
	var obj=Ext.getCmp('exportContent');
	if(obj!=null){
		var ele=obj.getInputId();
		var objTag=document.getElementById(ele);
		objTag.select(); 
		document.execCommand("Copy"); // 执行浏览器复制命令

	}
	
	
	
		this.up("window").close(); 
		
		} }
    ]
		 }).show();
			
			
			
			
			
			
			


            },
            disabled: false
        }, {
            itemId: 'importEmployee',
            text: '导入Config',
            iconCls: 'employee-remove',
            handler: function() {
			//var jsonText= JSON.stringify(window.localStorage);
			
			
						var my_windows=Ext.create('Ext.window.Window',{
						id:'myWindows',
                          title:'grid',
                          width:1000,
                          height:500,
                          modal:true,
                          plain:true,
						  layout:"vbox", //这个属性要添加，没有就不能正常添加子组件了  
						   items: [ 
                   
                        { xtype: "textarea",id:"importContent", style:"white-space:nowrap; overflow:scroll;" , cols:200,width:990,height:350,fieldLabel: "", selectOnFocus:true ,allowBlank: false,value:"{}" }
                   , {
			boxLabel  : '追加',
			xtype: 'checkbox',
            id: 'isAppend',
            width: 60,
			checked:"checked"
			}
                
       
    ],
    buttons: [
        { xtype: "button", text: "import", handler: function () { 
		 
	var obj=Ext.getCmp('importContent');
	var objAppend=Ext.getCmp('isAppend');
	if(obj!=null){
		//var ele=obj.getInputId();
		//var isAppend=objAppend.getInputId();
	
	 if(objAppend.getValue()){
		 //---追加代码
		 saveBatch(obj.getValue());
	 }else{
		 cleanStore();
		 //---清除在添加
		loadFromLocal(obj.getValue());
	 }
	 
	 
	 
	 
	
		location.reload();
		//console.log(objTag.value);
	//	objTag.select(); 
		//document.execCommand("Copy"); // 执行浏览器复制命令

	}
	
	
	
		this.up("window").close(); 
		
		} }
    ]
		 }).show();
			
			
			
		 
			


            },
            disabled: false
        }],
        plugins: [rowEditing],
        listeners:{
            'selectionchange': function(view, records) {
				 
				 for(var i=0;i<records.length;i++){
					   //alert(records[i].index+"|"+records[i].data.name);
				 }
                grid.down('#removeEmployee').setDisabled(!records.length);
            },
			
			'create':function(){
				//alert("x1");
				
			},
			'add':function(){
				 
			}
			,
			'edit':function(e){
                    var myMask = new Ext.LoadMask(Ext.getBody(), {
                                   msg: '正在修改，请稍后...',
                                   removeMask: true     //完成后移除
                      });
                      myMask.show();
					  if(!e.record){
						  e.record={
							  get:function(v){return e.context.newValues[v];}
						  };
						 // e.recard=e.context.newValues;
					  }
					var myId= e.record.get("uid");
					 
					  window.localStorage.setItem("task:"+ myId, JSON.stringify(e.context.newValues));
					  // e.record.commit();
					 e.view.markDirty=false
						myMask.hide();
		 
					  location.reload();
                } 
			
			
        }
    }
	 
);
 
}); 
