namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PayPalMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.PayPals",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TransactionId = c.String(),
                        PayerId = c.String(),
                        PayerEmail = c.String(),
                        IdTicket = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Tickets", t => t.IdTicket, cascadeDelete: true)
                .Index(t => t.IdTicket);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.PayPals", "IdTicket", "dbo.Tickets");
            DropIndex("dbo.PayPals", new[] { "IdTicket" });
            DropTable("dbo.PayPals");
        }
    }
}
