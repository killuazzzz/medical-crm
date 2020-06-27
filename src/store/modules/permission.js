// 权限标识表
const permission = {
  state: {
    pDashboard: {
      amdinPanel: 'dashboard_admin_panel'
    },
    pSystem: {
      role: {
        add: 'role_add',
        updateMenu: 'role_menu_update',
        updateData: 'role_data_update'
      }
    },
    pUser: {
      account: {
        add: 'user_add',
        uploadExcel: 'user_excle_upload',
        downloadExcel: 'user_excle_demo',
        updateRole: 'user_role_update',
        updateDepartment: 'user_department_update',
        updateOrg: 'user_org_update'
      },
      mechanism: {
        add: 'org_add',
        update: 'org_update',
        view: 'org_view'
      }
    },
    pMedical: {
      equipment: {
        add: 'equipment_add',
        update: 'equipment_update',
        view: 'equipment_view',
        subs: 'equipment_subs',
        addSubs: 'equipment_subs_add',
        material: 'material',
        materialAdd: 'material_add'
      }
    },
    pMonitoring: {
      run: {
        view: 'equipment_log_view'
      }
    },
    pBenefit: {
      month: {
        monthList: 'medical_month_list',
        yearList: 'medical_year_list'
      },
      yield: {
        profit: 'medical_profit'
      },
      exponent: {
        efficiency: 'medical_efficiency'
      }
    },
    pTerminal: {
      operation: {
        update: 'medical_update',
        view: 'medical_view',
        alloc: 'medical_alloc'
      },
      maintenance: {

      }
    }
  }
}

export default permission
