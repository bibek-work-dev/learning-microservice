import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  eventType: string;

  @Prop({ required: true })
  entityId: string;

  @Prop({ type: Object })
  metadata: Record<string, any>;

  @Prop({ required: true })
  timestamp: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
