import { ApiBody } from '@nestjs/swagger';

export const ApiFile = (fileName: string = 'xmlFile'): MethodDecorator => (
  target: Object | string | symbol,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) => {
  ApiBody({
    schema: {
      type: 'object',
      properties: {
        [fileName]: {
          type: 'string',
          format: 'binary'
        },
        serverShortName: { type: 'string', default: 'dev' },
        deleteXml: { type: 'string', default: 'game' }
      }
    }
  })(target, propertyKey, descriptor);
};
