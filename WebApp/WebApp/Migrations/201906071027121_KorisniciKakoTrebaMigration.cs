namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class KorisniciKakoTrebaMigration : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "KorisnikId", c => c.Int());
            CreateIndex("dbo.AspNetUsers", "KorisnikId");
            AddForeignKey("dbo.AspNetUsers", "KorisnikId", "dbo.Korisniks", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AspNetUsers", "KorisnikId", "dbo.Korisniks");
            DropIndex("dbo.AspNetUsers", new[] { "KorisnikId" });
            DropColumn("dbo.AspNetUsers", "KorisnikId");
        }
    }
}
