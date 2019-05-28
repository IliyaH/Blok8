namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class StanicaLinijaMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.StanicaLinijas",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        IdLinija = c.Int(nullable: false),
                        IdStanica = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Linijas", t => t.IdLinija, cascadeDelete: true)
                .ForeignKey("dbo.Stanicas", t => t.IdStanica, cascadeDelete: true)
                .Index(t => t.IdLinija)
                .Index(t => t.IdStanica);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.StanicaLinijas", "IdStanica", "dbo.Stanicas");
            DropForeignKey("dbo.StanicaLinijas", "IdLinija", "dbo.Linijas");
            DropIndex("dbo.StanicaLinijas", new[] { "IdStanica" });
            DropIndex("dbo.StanicaLinijas", new[] { "IdLinija" });
            DropTable("dbo.StanicaLinijas");
        }
    }
}
