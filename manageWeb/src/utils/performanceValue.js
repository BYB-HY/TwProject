export function performanceValue(name, projectData) {
    
    let completion_value

    //客户部主任
    const list = projectData.filter(item => (item.type === '完成项目金额'));
    //客户部主任所有都是只计算完成项目金额部分的项目？
    if (name == "完成项目金额") {
        completion_value = money(list);
    }
    else if (name == "季度利润率") {
        //利润率*项目金额/所有项目金额
        completion_value = profitMargin(list)
    }
    else if (name == "协助投标数量") {
        completion_value = count(list)
    }



    //客户部副总监 
    const list1 = projectData.filter(item => (item.type === '团队营业额'));
    //需要计算 团队营业额,广丰利润率,整组季度利润率,投标项目数量
    if (name === "团队营业额") {
        //和客户部主任一样
        completion_value = money(list1);
    }else if(name === "广丰利润率"){
        completion_value = '20%'
    }else if(name === "整组季度利润率"){
        //和客户部主任一样
        completion_value = profitMargin(list1)
    }else if(name === "投标项目数量"){
        //和客户部主任一样
        completion_value = count(list1)
    }
    

    //策划部副总监
    const list2 = projectData.filter(item => (item.type !== '未中标项目'));
    const list2_1 = projectData.filter(item => (item.type === '中标项目'));
    const list2_2 = projectData.filter(item => (item.type === '团队中标项目'));
    //投标数量,团队利润率,中标数量,中标金额,团队中标金额,
    if (name === "投标数量") {
        //和客户部主任一样,list不一样，这里直接projectData（包括未中标的）
        completion_value = count(projectData)
    }else if(name === "团队利润率"){
        //和客户部主任一样,list不一样
        completion_value = profitMargin(list2)
    }else if(name === "中标数量"){
       //和客户部主任一样,list不一样
       completion_value = count(list2_1)
    }else if(name === "中标金额"){
        //和客户部主任一样,list不一样
        completion_value = money(list2_1);
    }
    else if(name === "团队中标金额"){
       //和客户部主任一样,list不一样
       completion_value = money(list2_2);
    }

    //策划部主任
    // 投标数量,主笔利润率,中标数量,中标金额,
    //和策划部总监一样算
    if (name === "投标数量") {
        
        completion_value = count(projectData)
    }else if(name === "主笔利润率"){
        //不懂
    }else if(name === "中标数量"){
       
        completion_value = count(list2_1)
    }else if(name === "中标金额"){
       
       completion_value = money(list2_1);
    }

    //项目部经理    
    const list3 = projectData.filter(item => (item.type === '完成项目金额'));
    const list3_1 = projectData.filter(item => (item.type === '版块担当数量'));
    const list3_2 = projectData.filter(item => (item.type !== '未中标项目'));
    const list3_3 = projectData.filter(item => (item.type !== '版块担当数量'));
    // 完成项目金额,版块担当数量,季度利润率,投标项目数量
    if (name === "完成项目金额") {
         //和客户部主任一样,list不一样
        completion_value = money(list3);
    }else if(name === "版块担当数量"){
        completion_value = count(list3_1)
    }else if(name === "季度利润率"){
        completion_value = profitMargin(list3_2)
    }else if(name === "投标项目数量"){
        completion_value = count(list3_3)
       
    }

    //项目部总监    
    const list4 = projectData.filter(item => (item.type === '完成项目金额'));
    const list4_1 = projectData.filter(item => (item.type === '团队完成项目'));
    const list4_2 = projectData.filter(item => (item.type !== '未中标项目'));
    // 完成项目金额,团队完成金额,团队版块担当数量,团队利润率,投标项目数量,
    if (name === "完成项目金额") {
        completion_value = money(list4);
    }else if(name === "团队完成金额"){
        completion_value = money(list4_1);
    }else if(name === "团队版块担当数量"){
       
       //不懂
    }else if(name === "团队利润率"){
        completion_value = profitMargin(list4_2)
       
    }else if(name === "投标项目数量"){
        completion_value = count(projectData)
       
    }

    //演出总监    
    const list5 = projectData.filter(item => (item.type === '团队投标项目'));
    const list5_1 = projectData.filter(item => (item.type === '团队完成项目'));
    const list5_2 = projectData.filter(item => (item.type !== '未中标项目' || item.type !== '团队投标项目'));
    // 投标数量,执行项目数量,季度利润率,团队完成额,
    if (name === "投标数量") {
        completion_value = count(list5)
        
    }else if(name === "执行项目数量"){
        completion_value = count(list5_2)
    }else if(name === "季度利润率"){
        completion_value = profitMargin(list5_1)
       
    }else if(name === "团队完成额"){
        completion_value = money(list5_2);
       
    }
    //演出副总监    
    // 投标数量,执行数量,季度利润率,完成额度,
    if (name === "投标数量") {
        
        //
    }else if(name === "执行数量"){
        //
    }else if(name === "季度利润率"){
       //
       
    }else if(name === "完成额度"){
       
       //
    }

    //设计部平面    
    // 执行项目数量,季度利润率,项目完成金额,
    if (name === "执行项目数量") {
        
        //
    }else if(name === "季度利润率"){
        //
    }else if(name === "项目完成金额"){
       //
       
    }

    //设计部3d   
    // 投标数量,季度利润率,中标数量,中标金额,
    if (name === "投标数量") {
        
        //
    }else if(name === "季度利润率"){
        //
    }else if(name === "中标数量"){
       //
       
    }else if(name === "中标金额"){
       
       //
    }
    
    //设计部总监    
    // 投标数量,季度利润率,中标数量,中标数量,团队中标金额,
    if (name === "投标数量") {
        //
        
    }else if(name === "季度利润率"){
        //
    }else if(name === "中标数量"){
       //
       
    }else if(name === "中标金额"){
       //
       
    }else if(name === "团队中标金额"){
       
       //
    }


    return completion_value
}

//计算金额
function money(list) {
   return list.reduce((sum, item) => sum + Number(item.total_completion_amount), 0).toString().replace(/^0+([1-9])/)
}
//计算利润
function profitMargin(list) {
    let sum = (list.reduce((total, item) => total + item.profit_margin * item.project_amount, 0));
    return (sum !== 0) ? (sum / calculateTotal(list, 'project_amount')) : 0
}
//计算数量
function count(list) {
    return list.reduce((sum, item) => sum + Number(item.bid_assistance_quantity), 0).toString().replace(/^0+([1-9])/);
}

//对象中的属性求和函数封装
function calculateTotal(data, prop) {
    //data:对象   prop：需要求和的属性
    return data
        .reduce((sum, item) => sum + Number(item[prop]), 0)
        .toString()
        .replace(/^0+([1-9])/, '$1');
}