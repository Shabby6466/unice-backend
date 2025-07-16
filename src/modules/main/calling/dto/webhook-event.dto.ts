import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsObject, IsOptional, IsDateString, IsEnum, IsArray, IsBoolean, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export enum StreamWebhookEventType {
  CALL_CREATED = 'call.created',
  CALL_ENDED = 'call.ended',
  CALL_RING = 'call.ring',
  CALL_UPDATED = 'call.updated',
  CALL_ACCEPTED = 'call.accepted',
  CALL_REJECTED = 'call.rejected',
  CALL_MISSED = 'call.missed',
  CALL_NOTIFIED = 'call.notified',
  CALL_NOTIFICATION = 'call.notification',
  CALL_REACTION = 'call.reaction',
  CALL_RECORDING_STARTED = 'call.recording_started',
  CALL_RECORDING_STOPPED = 'call.recording_stopped',
  CALL_RECORDING_READY = 'call.recording_ready',
  CALL_LAYOUT_CHANGED = 'call.layout_changed',
  CALL_MEMBER_ADDED = 'call.member_added',
  CALL_MEMBER_REMOVED = 'call.member_removed',
  CALL_MEMBER_UPDATED = 'call.member_updated',
  CALL_MEMBER_UPDATED_PERMISSION = 'call.member_updated_permission',
  CALL_SESSION_STARTED = 'call.session_started',
  CALL_SESSION_ENDED = 'call.session_ended',
  CALL_SESSION_PARTICIPANT_JOINED = 'call.session_participant_joined',
  CALL_SESSION_PARTICIPANT_LEFT = 'call.session_participant_left',
  CALL_GEO_LOCATION_CHANGED = 'call.geo_location_changed',
  CALL_USER_MUTED = 'call.user_muted',
  CALL_USER_UNMUTED = 'call.user_unmuted',
  CALL_DEVICE_CHANGED = 'call.device_changed',
  CALL_LIVE_STARTED = 'call.live_started',
  CALL_LIVE_STOPPED = 'call.live_stopped',
  CALL_SCREEN_SHARE_STARTED = 'call.screen_share_started',
  CALL_SCREEN_SHARE_STOPPED = 'call.screen_share_stopped',
  HEALTH_CHECK = 'health.check',
}

export class StreamUserDto {
  @ApiProperty({ example: 'c4a795ed-afd0-40eb-9b3b-1f18270f450b' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'Hammad Ali' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '' })
  @IsString()
  language: string;

  @ApiProperty({ example: 'user' })
  @IsString()
  role: string;

  @ApiProperty({ type: [String], example: [] })
  @IsArray()
  teams: string[];

  @ApiProperty({ example: '2025-04-21T16:22:00.284081Z' })
  @IsDateString()
  created_at: string;

  @ApiProperty({ example: '2025-04-21T16:22:00.285288Z' })
  @IsDateString()
  updated_at: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  banned: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  online: boolean;

  @ApiProperty({ type: [String], example: [] })
  @IsArray()
  blocked_user_ids: string[];

  @ApiProperty({ example: false })
  @IsBoolean()
  shadow_banned: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  invisible: boolean;
}


export class StreamParticipantDto {
  @ApiProperty({ type: StreamUserDto })
  @ValidateNested()
  @Type(() => StreamUserDto)
  user: StreamUserDto;

  @ApiProperty({ example: 'ec815e46-1099-4061-a4ef-7223a8001d02' })
  @IsString()
  user_session_id: string;

  @ApiProperty({ example: 'user' })
  @IsString()
  role: string;

  @ApiProperty({ example: '2025-04-21T16:22:32.76086967Z' })
  @IsDateString()
  joined_at: string;
}

export class StreamMemberDto {
  @ApiProperty({ type: StreamUserDto })
  @ValidateNested()
  @Type(() => StreamUserDto)
  user: StreamUserDto;

  @ApiProperty({ example: 'c4a795ed-afd0-40eb-9b3b-1f18270f450b' })
  @IsString()
  user_id: string;

  @ApiProperty({ example: 'admin' })
  @IsString()
  role: string;

  @ApiProperty({ type: Object, example: {} })
  @IsObject()
  custom: Record<string, any>;

  @ApiProperty({ example: '2025-04-21T16:22:01.141061Z' })
  @IsDateString()
  created_at: string;

  @ApiProperty({ example: '2025-04-21T16:22:01.141061Z' })
  @IsDateString()
  updated_at: string;
}

export class StreamResolutionDto {
  @ApiProperty({ example: 1280 })
  width: number;

  @ApiProperty({ example: 720 })
  height: number;

  @ApiProperty({ example: 1500000 })
  bitrate: number;
}

export class StreamLayoutDto {
  @ApiProperty({ example: 'spotlight' })
  name: string;

  @ApiProperty({ example: '' })
  external_app_url: string;

  @ApiProperty({ example: '' })
  external_css_url: string;

  @ApiProperty({ example: false })
  detect_orientation: boolean;
}

export class StreamCallSettingsDto {
  @ApiProperty({ type: Object })
  @IsObject()
  audio: Record<string, any>;

  @ApiProperty({ type: Object })
  @IsObject()
  backstage: Record<string, any>;

  @ApiProperty({ type: Object })
  @IsObject()
  broadcasting: Record<string, any>;

  @ApiProperty({ type: Object })
  @IsObject()
  geofencing: Record<string, any>;

  @ApiProperty({ type: Object })
  @IsObject()
  recording: Record<string, any>;

  @ApiProperty({ type: Object })
  @IsObject()
  frame_recording: Record<string, any>;

  @ApiProperty({ type: Object })
  @IsObject()
  ring: Record<string, any>;

  @ApiProperty({ type: Object })
  @IsObject()
  screensharing: Record<string, any>;

  @ApiProperty({ type: Object })
  @IsObject()
  transcription: Record<string, any>;

  @ApiProperty({ type: Object })
  @IsObject()
  video: Record<string, any>;

  @ApiProperty({ type: Object })
  @IsObject()
  thumbnails: Record<string, any>;

  @ApiProperty({ type: Object })
  @IsObject()
  limits: Record<string, any>;

  @ApiProperty({ type: Object })
  @IsObject()
  session: Record<string, any>;
}

export class StreamIngressDto {
  @ApiProperty({ type: Object })
  @IsObject()
  rtmp: Record<string, any>;
}

export class StreamEgressDto {
  @ApiProperty({ example: false })
  @IsBoolean()
  broadcasting: boolean;

  @ApiProperty({ type: Object, nullable: true })
  @IsOptional()
  hls: Record<string, any> | null;

  @ApiProperty({ type: [Object], example: [] })
  @IsArray()
  rtmps: any[];

  @ApiProperty({ type: Object, nullable: true })
  @IsOptional()
  frame_recording: Record<string, any> | null;
}

export class StreamSessionParticipantDto {
  @ApiProperty({ type: StreamUserDto })
  @ValidateNested()
  @Type(() => StreamUserDto)
  user: StreamUserDto;

  @ApiProperty({ example: 'ec815e46-1099-4061-a4ef-7223a8001d02' })
  @IsString()
  user_session_id: string;

  @ApiProperty({ example: 'guest' })
  @IsString()
  role: string;

  @ApiProperty({ example: '2025-04-21T16:22:32Z' })
  @IsDateString()
  joined_at: string;
}

export class StreamSessionDto {
  @ApiProperty({ example: 'a3225d81-bd43-447e-b5de-1c3acfadaf43' })
  @IsString()
  id: string;

  @ApiProperty({ example: '2025-04-21T16:22:32.74978Z' })
  @IsDateString()
  started_at: string;

  @ApiProperty({ type: String, nullable: true, example: null })
  @IsOptional()
  ended_at: string | null;

  @ApiProperty({ type: [StreamSessionParticipantDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StreamSessionParticipantDto)
  participants: StreamSessionParticipantDto[];

  @ApiProperty({ type: Object, nullable: true })
  @IsOptional()
  participants_count_by_role: Record<string, number> | null;

  @ApiProperty({ example: 0 })
  @IsNumber()
  anonymous_participant_count: number;

  @ApiProperty({ type: Object, nullable: true })
  @IsOptional()
  rejected_by: Record<string, unknown> | null;

  @ApiProperty({ type: Object, nullable: true })
  @IsOptional()
  accepted_by: Record<string, unknown> | null;

  @ApiProperty({ type: Object, nullable: true })
  @IsOptional()
  missed_by: Record<string, unknown> | null;

  @ApiProperty({ example: '2025-04-21T16:22:32.750172Z' })
  @IsDateString()
  live_started_at: string;

  @ApiProperty({ type: String, nullable: true, example: null })
  @IsOptional()
  live_ended_at: string | null;

  @ApiProperty({ type: String, nullable: true, example: null })
  @IsOptional()
  timer_ends_at: string | null;
}

export class StreamCallDto {
  @ApiProperty({ example: 'default' })
  @IsString()
  type: string;

  @ApiProperty({ example: '0LanQvnMQW7P' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'default:0LanQvnMQW7P' })
  @IsString()
  cid: string;

  @ApiProperty({ example: '' })
  @IsString()
  current_session_id: string;

  @ApiProperty({ type: StreamUserDto })
  @ValidateNested()
  @Type(() => StreamUserDto)
  created_by: StreamUserDto;

  @ApiProperty({ type: Object, nullable: true })
  @IsOptional()
  custom: Record<string, any> | null;

  @ApiProperty({ example: '2025-04-21T16:22:01.134047Z' })
  @IsDateString()
  created_at: string;

  @ApiProperty({ example: '2025-04-21T16:22:01.134047Z' })
  @IsDateString()
  updated_at: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  recording: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  transcribing: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  captioning: boolean;

  @ApiProperty({ type: String, nullable: true, example: null })
  @IsOptional()
  ended_at: string | null;

  @ApiProperty({ type: String, nullable: true, example: null })
  @IsOptional()
  starts_at: string | null;

  @ApiProperty({ example: false })
  @IsBoolean()
  backstage: boolean;

  @ApiProperty({ type: StreamCallSettingsDto })
  @ValidateNested()
  @Type(() => StreamCallSettingsDto)
  settings: StreamCallSettingsDto;

  @ApiProperty({ type: [String], example: [] })
  @IsArray()
  blocked_user_ids: string[];

  @ApiProperty({ type: StreamIngressDto })
  @ValidateNested()
  @Type(() => StreamIngressDto)
  ingress: StreamIngressDto;

  @ApiProperty({ type: StreamSessionDto, nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => StreamSessionDto)
  session: StreamSessionDto | null;

  @ApiProperty({ type: StreamEgressDto })
  @ValidateNested()
  @Type(() => StreamEgressDto)
  egress: StreamEgressDto;

  @ApiProperty({ type: Object, nullable: true })
  @IsOptional()
  thumbnails: Record<string, any> | null;

  @ApiProperty({ example: 0 })
  join_ahead_time_seconds: number;

  @ApiProperty({ type: String, nullable: true })
  @IsOptional()
  channel_cid: string | null;
}

export class StreamWebhookEventDto {
  @ApiProperty({
    description: 'The type of the webhook event',
    enum: StreamWebhookEventType,
    example: StreamWebhookEventType.CALL_CREATED
  })
  @IsNotEmpty()
  @IsEnum(StreamWebhookEventType)
  type: StreamWebhookEventType;

  @ApiProperty({
    description: 'The created at timestamp',
    example: '2025-04-21T16:22:01.151399581Z'
  })
  @IsNotEmpty()
  @IsDateString()
  created_at: string;

  @ApiProperty({
    description: 'The call CID in format {type}:{id}',
    example: 'default:0LanQvnMQW7P'
  })
  @IsNotEmpty()
  @IsString()
  call_cid: string;

  @ApiProperty({
    description: 'The session ID for session-related events',
    example: 'a3225d81-bd43-447e-b5de-1c3acfadaf43',
    required: false
  })
  @IsOptional()
  @IsString()
  session_id?: string;

  @ApiProperty({
    description: 'The call details',
    type: StreamCallDto
  })
  @ValidateNested()
  @Type(() => StreamCallDto)
  call: StreamCallDto;

  @ApiProperty({
    description: 'The call members',
    type: [StreamMemberDto],
    required: false
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StreamMemberDto)
  members?: StreamMemberDto[];

  @ApiProperty({
    description: 'The user details',
    type: StreamUserDto,
    required: false
  })
  @IsOptional()
  user?: StreamUserDto;

  @ApiProperty({
    description: 'The video call status',
    type: Boolean,
    required: false
  })
  @IsOptional()
  video?: boolean;


    @ApiProperty({
    description: 'The participant details',
    type: StreamParticipantDto
  })
  @ValidateNested()
  @IsOptional()
  @Type(() => StreamParticipantDto)
  participant?: StreamParticipantDto;

  @ApiProperty({
    description: 'The duration of the call in seconds',
    example: 100
  })
  @IsNumber()
  @IsOptional()
  duration_seconds?: number;
}

export class StreamSignatureDto {
  @ApiProperty({
    description: 'Stream webhook signature for verification',
    example: 'sha256=1234567890abcdef'
  })
  @IsString()
  @IsOptional()
  'x-signature'?: string;


}