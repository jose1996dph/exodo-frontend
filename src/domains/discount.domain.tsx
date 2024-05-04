export type DiscountItem = {
  id: number
  supplierId: number
  percentage: number
  deadline: number
}

export class CreateDiscount {
  percentage: number
  deadline: number

  constructor(percentage: number, deadLine: number) {
    this.percentage = percentage
    this.deadline = deadLine
  }
  public isValid(): Record<string, string> {
    const errors: Record<string, string> = {}
    if (!this.percentage || this.percentage <= 0) {
      errors['percentage'] = 'Porcentaje es requerida'
    }
    if (!this.deadline || this.deadline <= 0) {
      errors['deadLine'] = 'Tiempo límite es requerido'
    }
    return errors
  }
}

export class UpdateDiscount {
  percentage: number
  deadline: number

  constructor(percentage: number, deadLine: number) {
    this.percentage = percentage
    this.deadline = deadLine
  }
  public isValid(): Record<string, string> {
    const errors: Record<string, string> = {}
    if (!this.percentage || this.percentage <= 0) {
      errors['discount'] = 'Porcentaje es requerida'
    }
    if (!this.deadline || this.deadline <= 0) {
      errors['deadLine'] = 'Tiempo límite es requerido'
    }
    return errors
  }
}
