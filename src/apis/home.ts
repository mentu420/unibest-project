import { http } from '@/utils/http'

// 获取任务列表
export const getTaskList = (data) => http({ url: '/api/mp/task', data })
