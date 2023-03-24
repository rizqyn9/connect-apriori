import { BadRequest, Conflict, NotFound } from "@/lib/error"
import { Customer, validatorCustomer } from "@/models/customer"

export async function findByCardId(cardId: string) {
  const customer = await Customer.findOne({
    cardId,
  })
  if (!customer) throw new NotFound()
  return customer
}

const createNewCustomer = async (data: TObjUnknown) => {
  const validate = validatorCustomer.safeParse(data)
  if (!validate.success) throw new BadRequest()

  const { cardId } = validate.data
  const exist = await findByCardId(cardId)
    .then(() => true)
    .catch(() => false)
  if (exist) throw new Conflict()

  const newCust = new Customer({
    ...validate.data,
  })

  return newCust.save()
}

export { createNewCustomer }
