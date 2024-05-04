import axios from 'axios'

const urlBase = 'https://exchange.vcoud.com/'

const convertSpecificFormat = (text: string, character = '-') => {
  const acentos = { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u' }
  for (const [acento, sinAcento] of Object.entries(acentos)) {
    text = text.toLowerCase().replace(acento, sinAcento).replace(' ', character)
  }
  return text
}

const convertDollarNameToMonitorName = (monitorName: string) => {
  if (monitorName.split(' ')[0] === 'Dólar' && monitorName !== 'Dólar Today') {
    if (monitorName === 'Dólar Monitor') {
      return 'EnParaleloVzla'
    } else {
      return monitorName.split(' ')[1]
    }
  }
  return monitorName
}

const bcvDollar = async (): Promise<number> => {
  const currency = 'bcv'
  const data: Record<string, any> = {}
  const response = await axios.get(urlBase + 'coins/latest')
  try {
    if (response.status !== 200) {
      throw new Error(`Error de comunicación CriptoDolar. Codigo: ${response.status}`)
    }

    const jsonResponse = response.data

    for (const monitor of jsonResponse) {
      if (monitor.type.includes('bolivar') || monitor.type.includes('bancove')) {
        const result = {
          title: convertDollarNameToMonitorName(monitor.name),
          price: monitor.price,
          priceOld: monitor.priceOld,
          type: monitor.type === 'bancove' ? 'bank' : 'monitor',
          lastUpdate: monitor.updatedAt,
        }

        data[convertSpecificFormat(result.title)] = result
      }
    }
    if (!(currency in data)) {
      throw new Error('BCV not found')
    }

    const monitorData = data[currency]

    return monitorData['price']
  } catch (e) {
    console.error(e)
    throw e
  }
}

export { bcvDollar }
