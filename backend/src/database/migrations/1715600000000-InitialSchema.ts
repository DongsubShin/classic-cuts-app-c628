import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1715600000000 implements MigrationInterface {
    name = 'InitialSchema1715600000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create Enums
        await queryRunner.query(`CREATE TYPE "users_role_enum" AS ENUM('admin', 'barber', 'client')`);
        await queryRunner.query(`CREATE TYPE "bookings_status_enum" AS ENUM('pending', 'confirmed', 'completed', 'cancelled')`);
        await queryRunner.query(`CREATE TYPE "notifications_type_enum" AS ENUM('sms', 'email')`);
        await queryRunner.query(`CREATE TYPE "notifications_status_enum" AS ENUM('scheduled', 'sent', 'failed')`);

        // Create Users Table
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "role" "users_role_enum" NOT NULL DEFAULT 'client', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_97672df88af87152a3f182e45b6" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_97672df88af87152a3f182e45b" ON "users" ("email") `);

        // Create Barbers Table
        await queryRunner.query(`CREATE TABLE "barbers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "specialties" text[] NOT NULL DEFAULT '{}', "working_hours" jsonb, "base_commission_rate" numeric(5,2) NOT NULL DEFAULT '0', "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "REL_36127129f7988880696954608c" UNIQUE ("user_id"), CONSTRAINT "PK_960520696803666991036669910" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_36127129f7988880696954608c" ON "barbers" ("is_active") `);

        // Create Clients Table
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid, "phone" character varying NOT NULL, "notes" text, "visit_count" integer NOT NULL DEFAULT 0, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "REL_f18e9366991036669910366699" UNIQUE ("user_id"), CONSTRAINT "PK_f18e93669910366699103666991" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f18e9366991036669910366699" ON "clients" ("phone") `);

        // Create Services Table
        await queryRunner.query(`CREATE TABLE "services" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text, "duration_minutes" integer NOT NULL, "price" numeric(10,2) NOT NULL, "category" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_ba2d6d4d54f9910366699103666" PRIMARY KEY ("id"))`);

        // Create Bookings Table
        await queryRunner.query(`CREATE TABLE "bookings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "barber_id" uuid NOT NULL, "client_id" uuid NOT NULL, "service_id" uuid NOT NULL, "start_time" TIMESTAMP WITH TIME ZONE NOT NULL, "end_time" TIMESTAMP WITH TIME ZONE NOT NULL, "status" "bookings_status_enum" NOT NULL DEFAULT 'pending', "total_price" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_bee680366699103666991036669" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bee68036669910366699103666" ON "bookings" ("start_time") `);
        await queryRunner.query(`CREATE INDEX "IDX_bee68036669910366699103667" ON "bookings" ("status") `);

        // Create Commissions Table
        await queryRunner.query(`CREATE TABLE "commissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "barber_id" uuid NOT NULL, "booking_id" uuid NOT NULL, "amount" numeric(10,2) NOT NULL, "commission_rate" numeric(5,2) NOT NULL, "paid_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "REL_d18e9366991036669910366699" UNIQUE ("booking_id"), CONSTRAINT "PK_d18e93669910366699103666991" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d18e9366991036669910366699" ON "commissions" ("booking_id") `);

        // Create Notifications Table
        await queryRunner.query(`CREATE TABLE "notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "client_id" uuid NOT NULL, "type" "notifications_type_enum" NOT NULL, "content" text NOT NULL, "scheduled_at" TIMESTAMP WITH TIME ZONE NOT NULL, "sent_at" TIMESTAMP WITH TIME ZONE, "status" "notifications_status_enum" NOT NULL DEFAULT 'scheduled', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_e18e93669910366699103666991" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e18e9366991036669910366699" ON "notifications" ("scheduled_at") `);
        await queryRunner.query(`CREATE INDEX "IDX_e18e9366991036669910366698" ON "notifications" ("status") `);

        // Foreign Keys
        await queryRunner.query(`ALTER TABLE "barbers" ADD CONSTRAINT "FK_36127129f7988880696954608c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_f18e9366991036669910366699" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_bee68036669910366699103666" FOREIGN KEY ("barber_id") REFERENCES "barbers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_bee68036669910366699103667" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_bee68036669910366699103668" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "commissions" ADD CONSTRAINT "FK_d18e9366991036669910366699" FOREIGN KEY ("barber_id") REFERENCES "barbers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "commissions" ADD CONSTRAINT "FK_d18e9366991036669910366698" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_e18e9366991036669910366699" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TABLE "commissions"`);
        await queryRunner.query(`DROP TABLE "bookings"`);
        await queryRunner.query(`DROP TABLE "services"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "barbers"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "notifications_status_enum"`);
        await queryRunner.query(`DROP TYPE "notifications_type_enum"`);
        await queryRunner.query(`DROP TYPE "bookings_status_enum"`);
        await queryRunner.query(`DROP TYPE "users_role_enum"`);
    }
}