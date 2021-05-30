import { APIGatewayProxyHandler } from 'aws-lambda';
import { document } from '../utils/dynamodbClient';
import { v4 as uuid } from 'uuid';

// interface ICreateTodo {
//   id: string;
//   user_id: string;
//   title: string;
//   done: boolean;
//   deadline: Date;
// }

export const handle: APIGatewayProxyHandler = async (event) => {
  const {user_id} = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body);

  await document.put({
    TableName: 'todos',
    Item: {
      id: uuid(),
      user_id,
      title,
      done: false,
      deadline: new Date(deadline).toISOString()
    }
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Todo created!'
    }),
    headers: {
      "Content-type": "application/json",
    }
  }
};