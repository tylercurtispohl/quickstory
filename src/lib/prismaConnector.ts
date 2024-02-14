import { PrismaClient } from "@prisma/client";

export class PrismaConnector {
  private static instance: PrismaConnector;
  private prismaClient: PrismaClient;

  private constructor() {
    this.prismaClient = new PrismaClient();
  }

  public static getInstance(): PrismaConnector {
    if (!PrismaConnector.instance) {
      PrismaConnector.instance = new PrismaConnector();
    }

    return PrismaConnector.instance;
  }

  public static getClient(): PrismaClient {
    return this.getInstance().prismaClient;
  }
}
