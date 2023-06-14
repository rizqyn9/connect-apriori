import { axiosPrivate } from '.'

type UpdateData = {
  id: string
} & Record<string, unknown>

export async function updateData(payload: UpdateData) {
  const { data } = await axiosPrivate.put('/user/update', { ...payload })
}
