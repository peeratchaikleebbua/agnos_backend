import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { PatientFormService } from './patient-form.service';
import { Server, Socket } from 'socket.io';
import { PatientFormDTO } from './dto/patient-form.dto';

@WebSocketGateway({ namespace: 'ws' })
export class PatientFormGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly patientFormService: PatientFormService) {}
  @WebSocketServer() server: Server;

  // Called when a client connects to the WebSocket server
  handleConnection(client: Socket): void {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket): void {
    console.log('Client disconnected:', client.id);
  }

  // Listen for incoming messages from the client
  @SubscribeMessage('patientForm:update')
  async handlePatientFormUpdate(
    @MessageBody() patientFormMessage: PatientFormDTO,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      // server sending recent patientForm through event
      this.server.emit('patientForm:recent', {
        clientId: client.id,
        ...patientFormMessage,
      });
      console.log(client.id);
    } catch (error) {
      console.log('Failed to Send PatientForm Data');
    }
  }
}
