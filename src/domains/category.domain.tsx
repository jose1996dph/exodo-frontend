export type CategoryItem = {
  id: number
  description: string
  createAt: string
  updateAt: string
}

export type CategoryDetail = {
  id: number
  description: string
  createAt: string
  updateAt: string
}

export class CreateCategory {
  description: string

  constructor(description: string) {
    this.description = description
  }

  public isValid(): Record<string, string> {
    const errors: Record<string, string> = {}
    if (!this.description) {
      errors['description'] = 'Description es requerida'
    }
    return errors
  }
}

export class UpdateCategory {
  description: string

  constructor(description: string) {
    this.description = description
  }

  public isValid(): Record<string, string> {
    const errors: Record<string, string> = {}
    if (!this.description) {
      errors['description'] = 'Description es requerida'
    }
    return errors
  }
}
